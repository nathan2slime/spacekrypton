import { IntentsBitField } from 'discord.js';
import { EventEmitter } from 'events';
import { config } from 'dotenv';
import { Client } from 'discordx';
import { envs } from '@kry/envs';

import { guildMemberAdd } from './events';
import { ready } from './events/ready';

import './commands';

config();

export const event = new EventEmitter();

const client = new Client({
  botGuilds: process.env.NODE_ENV == 'development' ? [envs.EVEN_GUILD_ID] : [],
  simpleCommand: {
    prefix: '!',
  },
  silent: false,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
  ],
});

client.on('ready', async () => await ready(client, event));

client.on('messageCreate', message => {
  client.executeCommand(message);
});

client.on('interactionCreate', interaction => {
  client.executeInteraction(interaction);
});

client.on('guildMemberAdd', guildMemberAdd);
client.login(process.env.EVEN_TOKEN as string);
