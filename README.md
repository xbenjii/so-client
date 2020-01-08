# sobot

### Instructions
```JavaScript
import { Client } from 'so-chat-client';

(async () => {
	const client = new Client({
		email: 'foo@bar.com',
		password: 'foobar',
		mainRoom: 17
	});

	client.once('open', () => console.log('Connected'));
	client.once('close', () => console.log('Connection closed'));
	client.on('error', error => console.error(error));
	client.on('event', event => console.log(event));
	client.on('debug', message => console.log(message));

	try {
		await client.auth(); // Authenticates with SO and sets up the client
		await client.join(); // If you don't pass an ID, it will join the room you passed into the config
	} catch (error) {
		console.error(error);
	}
})();
```