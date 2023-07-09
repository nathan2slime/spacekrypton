import {
  Colors,
  EmbedBuilder,
  GuildMember,
  channelMention,
  userMention,
} from 'discord.js';

import { getTodayApod } from '../services/apod';
import { format } from 'date-fns';

export const guildMemberAdd = async (member: GuildMember) => {
  const guild = member.guild;
  const channel = guild.systemChannel;

  if (channel) {
    const embed = new EmbedBuilder({
      title: 'Hi ' + member.user.username,
      color: Colors.Aqua,
      image: {
        url: 'attachment://welcome.png',
      },
      thumbnail: {
        url: member.avatar || member.displayAvatarURL(),
      },
      description: `Welcome to ${
        guild.name
      }\n\nPlease read the server ${channelMention(
        `${guild.rulesChannelId}`
      )} ${userMention(member.user.id)}`,
    });

    const data = await getTodayApod(format(new Date(), 'yyyy-MM-dd'));

    if (data) {
      if (data.media_type == 'image') embed.setImage(data.url);

      channel.send({
        embeds: [embed],
      });
    }
  }
};
