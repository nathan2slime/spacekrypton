import EventEmitter from 'events';
import { logger } from '@kry/logger';
import { Interaction, Colors, EmbedBuilder, Guild } from 'discord.js';
import { Client } from 'discordx';
import { envs } from '@kry/envs';

import { github } from '../webhooks/github';

export type Color = {
  [key: string]: number;
};

const trigger = async (
  data: Guild,
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

  const channel = data.channels.cache.get(
    envs.EVEN_LOGGER_CHANNEL
  ) as Interaction['channel'];

  if (channel) {
    channel.send({
      embeds: [
        new EmbedBuilder({
          title: 'Even',
          description:
            `${message}` +
            '\n\n``' +
            JSON.stringify({ level, ...payload }) +
            '``',
          color: color[level],
        }),
      ],
    });
  }
};

export const ready = async (client: Client, event: EventEmitter) => {
  const guilds = await client.guilds.fetch();
  const guild = guilds.find(guild => guild.id == envs.EVEN_GUILD_ID);
  const data = guild && (await guild.fetch());

  if (data && data.rulesChannel)
    event.on('even', (level: string, message: string, payload: object = {}) =>
      trigger(data, level, message, payload)
    );

  await client.initApplicationCommands({
    guild: { disable: { add: true, delete: true, update: true } },
  });

  const user = client.user;

  if (user) event.emit('even', 'success', 'ready: ' + user.username);

  github(event);
};
