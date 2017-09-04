/// <reference types="node" />
/// <reference types="ws" />
import { EventEmitter } from 'events';
import * as WS from 'ws';
export interface BotConfig {
    mainRoom: number;
    email: string;
    password: string;
}
export declare class Client extends EventEmitter {
    private jar;
    private fkey;
    private ws;
    private rooms;
    private mainRoom;
    private email;
    private password;
    constructor(config: BotConfig);
    auth(): Promise<any>;
    setup(): Promise<any>;
    createWsConnection(roomid: number, fkey: string): Promise<WS>;
    join(roomid?: number): Promise<{}>;
    leave(roomid?: string): Promise<any>;
    makeRequest(path: string, options: {
        form?: {
            [key: string]: any;
        };
        method?: 'POST';
    }): Promise<any>;
    send(text: string, roomid?: number): Promise<any>;
    edit(text: string, messageId: number): Promise<any>;
    kick(userid: number, reason?: string): Promise<any>;
    timeout(roomid: number, duration: number, reason: string): Promise<any>;
}
