import EventEmitter from 'events';
import { logger } from '@kry/logger';
import axios from 'axios';
import { Colors, EmbedBuilder } from 'discord.js';
import { Client } from 'discordx';
import { envs } from '@kry/envs';

import { github } from '../webhooks/github';

export type Color = {
  [key: string]: number;
};

const trigger = async (
  level: string,
  message: string,
  payload: object = {}
) => {
  logger.log(level, message, payload);

  const color: Color = {
    info: Colors.White,
    debug: Colors.Yellow,
    error: Colors.Red,
    success: Colors.Green,
  };

  const embed = new EmbedBuilder({
    title: 'Even',
    description:
      `${message}` + '\n\n``' + JSON.stringify({ level, ...payload }) + '``',
    color: color[level],
  }).toJSON();

  try {
    await axios.post(envs.EVEN_WEBHOOK_LOGGER, {
      embeds: [embed],
    });
  } catch (error) {
    logger.error('send logger', (error as Error).message);
  }
};

export const ready = async (client: Client, event: EventEmitter) => {
  const guilds = await client.guilds.fetch();
  const guild = guilds.find(guild => guild.id == envs.EVEN_GUILD_ID);
  const data = guild && (await guild.fetch());

  if (data)
    event.on('even', (level: string, message: string, payload: object = {}) =>
      trigger(level, message, payload)
    );

  await client.initApplicationCommands({
    guild: { disable: { add: true, delete: true, update: true } },
  });

  const user = client.user;

  if (user) event.emit('even', 'success', 'ready');

  github(event);
};
