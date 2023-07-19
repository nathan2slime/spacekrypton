import { IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
import { Client } from 'discordx';

import { guildMemberAdd } from './events';

import './commands';

config();

const EVEN_GUILD_ID = process.env.EVEN_GUILD_ID as string;

const client = new Client({
  botGuilds: process.env.NODE_ENV == 'development' ? [EVEN_GUILD_ID] : [],
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

client.on('ready', async () => {
  await client.initApplicationCommands({
    guild: { disable: { add: true, delete: true, update: true } },
  });

  const user = client.user;

  if (user) console.info('Ready: ', user.username);
});

client.on('messageCreate', message => {
  client.executeCommand(message);
});

client.on('interactionCreate', interaction => {
  client.executeInteraction(interaction);
});

client.on('guildMemberAdd', guildMemberAdd);

client.login(process.env.EVEN_TOKEN as string);
