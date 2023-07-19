import {
  ApplicationCommandOptionType,
  Colors,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { format, parse } from 'date-fns';
import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
  Slash,
  SlashChoice,
  SlashOption,
} from 'discordx';

import { getHoverMars } from '../services/mars';
import { HoverImagePayload } from '../services/mars/types';
import { AppCommand } from './types';

@Discord()
export class Mars {
  description = '';

  randomize(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async command(data: AppCommand<HoverImagePayload>) {
    const { slash, simple, value } = data;
    const getDate = () =>
      new Date(parse(value.date || '', 'dd/MM/yyyy', new Date()));

    try {
      format(getDate(), 'yyyy-MM-dd');
    } catch (error) {
      const reply = 'Choose dates in the format 08/03/2003';

      return slash ? slash.reply(reply) : simple && simple.message.reply(reply);
    }
    const date = format(getDate(), 'yyyy-MM-dd');

    const { photos } = await getHoverMars({ ...value, date });

    try {
      if (photos.length > 0) {
        const data = photos[this.randomize(0, photos.length - 1)];
        if (data) {
          const embed = new EmbedBuilder({
            title: data.camera.full_name,
            description:
              "Access images collected by NASA's Curiosity, Opportunity and Spirit rovers on Mars",
            color: Colors.Gold,
            fields: [
              {
                name: '🤖・Rover',
                value: data.rover.name,
              },
              {
                name: '📃・Status',
                value: data.rover.status.toUpperCase(),
              },
              {
                name: '🚀・Launch date',
                value: format(new Date(data.rover.launch_date), 'dd/MM/yyyy'),
              },
              {
                name: '🌞・Sol',
                value: data.sol.toString(),
              },
              {
                name: '🌎・Earth date',
                value: format(new Date(data.earth_date), 'dd/MM/yyyy'),
              },
            ],
          });

          embed.setImage(data.img_src);

          return slash
            ? slash.reply({ embeds: [embed] })
            : simple && simple.message.reply({ embeds: [embed] });
        }
      }

      throw new Error();
    } catch (error) {
      const reply =
        'Sorry, not even an image was found, try with other parameters';

      return slash ? slash.reply(reply) : simple && simple.message.reply(reply);
    }
  }

  @Slash({
    description:
      "Access images collected by NASA's Curiosity, Opportunity and Spirit rovers on Mars",
    name: 'mars',
  })
  async slashCommandApod(
    @SlashChoice({ name: 'Curiosity', value: 'curiosity' })
    @SlashChoice({ name: 'Opportunity', value: 'opportunity' })
    @SlashChoice({ name: 'Spirit', value: 'spirit' })
    @SlashOption({
      description: 'Select a rover',
      name: 'rover',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    rover: string,
    @SlashOption({
      description: 'Select a page',
      name: 'page',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    page: number,
    @SlashChoice({
      name: 'FHAZ - Front Hazard Avoidance Camera',
      value: 'FHAZ',
    })
    @SlashChoice({ name: 'RHAZ - Rear Hazard Avoidance Camera', value: 'RHAZ' })
    @SlashChoice({ name: 'MAST - Mast Camera', value: 'MAST' })
    @SlashChoice({
      name: 'CHEMCAM - Chemistry and Camera Complex',
      value: 'CHEMCAM',
    })
    @SlashChoice({ name: 'MAHLI - Mars Hand Lens Imager', value: 'MAHLI' })
    @SlashChoice({ name: 'MARDI - Mars Descent Imager', value: 'MARDI' })
    @SlashChoice({ name: 'NAVCAM - Navigation Camera', value: 'NAVCAM' })
    @SlashChoice({ name: 'PANCAM - Panoramic Camera	', value: 'PANCAM' })
    @SlashChoice({
      name: 'MINITES - Miniature Thermal Emission Spectrometer',
      value: 'MINITES',
    })
    @SlashOption({
      description: 'Select a rover camera',
      name: 'camera',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    camera: string,
    @SlashOption({
      description: 'Select a date on earth',
      name: 'date',
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    date: string,
    @SlashOption({
      description: 'Select a sol',
      name: 'sol',
      required: false,
      type: ApplicationCommandOptionType.Number,
    })
    sun: number,
    slash: CommandInteraction
  ) {
    await this.command({
      value: { camera, date, rover, page, sun },
      slash,
    });
  }

  @SimpleCommand({
    description:
      "Access images collected by NASA's Curiosity, Opportunity and Spirit rovers on Mars",
    name: 'mars',
  })
  async add(
    @SimpleCommandOption({
      name: 'rover',
      type: SimpleCommandOptionType.String,
      description: 'Select a rover',
    })
    rover: string,
    @SimpleCommandOption({
      name: 'page',
      description: 'Select a page',
      type: SimpleCommandOptionType.String,
    })
    page: number,
    @SimpleCommandOption({
      name: 'camera',
      description: 'Select a hover camera',
      type: SimpleCommandOptionType.String,
    })
    camera: string,
    @SimpleCommandOption({
      name: 'date',
      description: 'Select a date on earth',
      type: SimpleCommandOptionType.String,
    })
    date: string,
    simple: SimpleCommandMessage
  ) {
    const embed = new EmbedBuilder({
      color: Colors.Purple,
      title: 'COMMAND INFO',
      fields: [
        {
          name: 'Description',
          value:
            "Access images collected by NASA's Curiosity, Opportunity and Spirit rovers on Mars",
        },
        {
          name: 'Usage',
          value: '``!mars {rover} {page} {camera} {date}``',
        },
        {
          name: 'Options',
          value:
            '**rover** - Select a rover, available are ``curiosity``, ``opportunity`` and ``spirit``\n**date** - Select a date on earth, in the format ``08/03/2003``\n**page** - Select a page, example ``1``\n**camera** - Select a camera, can be ``MINITES``, ``FHAZ``, ``RHAZ``, ``MAST``, ``CHEMCAM``, ``MAHLI``, ``MARDI``, ``NAVCAM``, ``PANCAM`` and ``MINITES``',
        },
        {
          name: 'Rover Camera',
          value: `
            *FHAZ* (Front Hazard Avoidance Camera) is available on rover(s): Curiosity, Opportunity and Spirit
            *RHAZ* (Rear Hazard Avoidance Camera) is available on rover(s): Curiosity, Opportunity and Spirit
            *MAST* (Mast Camera) is available on rover(s): Curiosity
            *CHEMCAM* (Chemistry and Camera Complex) is available on rover(s): Curiosity
            *MAHLI* (Mars Hand Lens Imager) is available on rover(s): Curiosity
            *MARDI* (Mars Descent Imager) is available on rover(s): Curiosity
            *NAVCAM* (Navigation Camera) is available on rover(s): Curiosity, Opportunity and Spirit
            *PANCAM* (Panoramic Camera) is available on rover(s): Opportunity and Spirit
            *MINITES* (Miniature Thermal Emission Spectrometer) is available on rover(s): Opportunity and Spirit
          `,
        },
      ],
    });

    if (!simple.isValid()) return simple.message.reply({ embeds: [embed] });

    await this.command({
      simple,
      value: {
        camera,
        date,
        page,
        rover,
      },
    });
  }
}
