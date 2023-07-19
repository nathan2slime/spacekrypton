import { CommandInteraction } from 'discord.js';
import { SimpleCommandMessage } from 'discordx';

export type AppCommand<T> = {
  value: T;
  simple?: SimpleCommandMessage;
  slash?: CommandInteraction;
};
