import { EventEmitter } from 'events';
import { stringify } from 'querystring';

import * as Bluebird from 'bluebird';
import * as WS from 'ws';
import { jar } from 'request';
import * as request from 'request-promise';
import * as cheerio from 'cheerio';

import { logger } from './logger';

const BASE_URL = 'https://chat.stackoverflow.com';

type WSMessage = {
    data: {
        e: any[]; //todo
        t: any; // todo
        d: any; // todo
    }
}

interface BotConfig {
    mainRoom: number;
    email: string;
    password: string;
}

export class Client extends EventEmitter {
    public logger = logger;
    private jar = jar();
    private fkey: string;
    private ws: WS;
    private rooms = {};
    private mainRoom: number;
    private email: string;
    private password: string;

    constructor(config: BotConfig) {
        super();
        this.mainRoom = config.mainRoom;
        this.email = config.email;
        this.password = config.password;
    }
    async auth() {
        this.logger.debug(`Authenticating with email ${this.email}`);
        const body = await request({
            method: 'GET',
            uri: 'https://stackoverflow.com/users/login',
            jar: this.jar
        });
        const $ = cheerio.load(body);
        const fkey = $('input[name="fkey"]').val();
        this.logger.debug(`Using fkey ${fkey} to login`);
        return request({
            method: 'POST',
            uri: 'https://stackoverflow.com/users/login',
            jar: this.jar,
            followAllRedirects: true,
            form: {
                fkey,
                email: this.email,
                password: this.password
            }
        });
    }
    async connect() {
        const body = await request({
            method: 'GET',
            uri: BASE_URL,
            jar: this.jar
        });
        const $ = cheerio.load(body);
        this.fkey = $('input[name="fkey"]').val();
        this.logger.debug(`Setting bot fkey to ${this.fkey}`);
        return body;
    }
    async createWsConnection(roomid: number, fkey: string) {
        this.logger.debug(`Getting WS URL for room ${roomid}`);
        const form = stringify({ roomid, fkey });
        const body = await request({
            method: 'POST',
            uri: `${BASE_URL}/ws-auth`,
            jar: this.jar,
            body: form,
            headers: {
                Origin: BASE_URL,
                Referer: `${BASE_URL}/rooms/${roomid}`,
                'Content-Length': form.length,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const wsAddress = JSON.parse(body).url;
        return new WS(`${wsAddress}?l=99999999999`, { origin: BASE_URL });
    }
    async join(roomid?: number) {
        const originalRoom = roomid === undefined;
        if (!this.fkey) {
            throw new Error('Not connected');
        }
        if (!roomid) {
            roomid = this.mainRoom;
        }
        this.logger.debug(`Joining room ${roomid}`);
        const ws = await this.createWsConnection(roomid, this.fkey);
        if(!originalRoom) {
            ws.on('message', () => ws.close());
        } else {
            ws.on('error', error => this.emit('error', error));
            ws.on('close', error => this.emit('close', error));
            ws.on('message', (message) => {
                const json = JSON.parse(message.toString()) as WSMessage;
                for (let [room, data] of Object.entries(json)) {
                    if (data.e && Array.isArray(data.e) && (data.t != data.d)) {
                        data.e.forEach(event => {
                            this.emit('event', event)
                        });
                    }
                }
            });
            this.ws = ws;
        }
        return new Bluebird(resolve => {
            ws.once('open', () => {
                this.logger.debug(`Connected to room ${roomid}`);
                resolve();
            });
        });
    }
    async leave(roomid = 'all') {
        if (!this.fkey) {
            throw new Error('Not connected');
        }
        this.logger.debug(`Leaving room ${roomid}`);
        return request({
            method: 'POST',
            uri: `${BASE_URL}/chats/leave/${roomid}`,
            jar: this.jar,
            form: {
                quiet: true,
                fkey: this.fkey
            }
        });
    }
    async makeRequest(
        path: string,
        options: {
            form?: { [key: string] : any }
            method?: 'POST'
        }
    ) {
        const uri = `${BASE_URL}/${path}`;
        const response = await request({
            ...{
                ...options,
                form: {
                    ...(options.form ? options.form : {}),
                    fkey: this.fkey
                }
            },
            uri,
            jar: this.jar,
        });
        return (response && response.length) ? JSON.parse(response) : {};
    }
    send(text: string, roomid: number) {
        if (!roomid) {
            roomid = this.mainRoom;
        }
        const path = `chats/${roomid}/messages/new`;
        return this.makeRequest(path, {
            form: { text }
        }).then(data => data.id);
    }
    edit(text: string, messageId: number) {
        const path = `messages/${messageId}`;
        return this.makeRequest(path, {
            form: { text }
        });
    }
    kick(userid: number, reason?: string) {
        const path = `rooms/kickmute/${userid}`;
        return this.makeRequest(path, {});
    }
    timeout(roomid: number, duration: number, reason: string) {
        const path = `rooms/timeout/${roomid}`;
        return this.makeRequest(path, {
            form: { duration, reason }
        });
    }
}