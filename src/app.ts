import { ClientConfig } from '../config';
import { Client } from './client';

export default async (config: ClientConfig) => {
	const client = new Client(config);
	try {
		await client.auth();
		await client.connect();
		await client.join();
	} catch (error) {
		console.trace(error);
	}

	client.once('open', () => console.log('Connected'));
	client.once('close', () => console.log('Connection closed'));
	client.on('error', error => console.error(error));
};