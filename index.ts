import { config } from './config';
import bot from './src/app';

console.log('config', config);

bot(config);