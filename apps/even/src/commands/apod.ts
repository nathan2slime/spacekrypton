import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { format, parse, toDate } from 'date-fns';

import { getTodayApod } from '../services/apod';

@Discord()
export class Apod {
  @Slash({ description: 'Returns astronomy picture day', name: 'apod' })
  async apod(
    @SlashOption({
      description: 'Photo date (03/08/2003)',
      name: 'date',
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    value: string,
    interaction: CommandInteraction
  ) {
    const getDate = () => new Date(parse(value, 'dd/MM/yyyy', new Date()));

    if (value) {
      try {
        format(getDate(), 'yyyy-MM-dd');
      } catch (error) {
        return interaction.reply(
          'Choose dates from June 16, 1995 and in the format 08/03/2003'
        );
      }
    }

    const data = await getTodayApod(
      format(value ? getDate() : new Date(), 'yyyy-MM-dd')
    );

    if (data) {
      const embed = new EmbedBuilder({
        title: data.title,
        description: `${data.explanation}\n\nDate: ${format(
          new Date(data.date),
          'dd/MM/yyyy'
        )}`,
        image: {
          url: data.url,
        },
      });

      interaction.reply({
        embeds: [embed],
      });
    } else {
      interaction.reply("I couldn't find an apod for that day");
    }
  }
}
