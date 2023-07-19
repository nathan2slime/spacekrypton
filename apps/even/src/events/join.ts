import {
  Colors,
  EmbedBuilder,
  GuildMember,
  channelMention,
  userMention,
} from 'discord.js';
import { format } from 'date-fns';

import { getTodayApod } from '../services/apod';
import { event } from '../index';

export const guildMemberAdd = async (member: GuildMember) => {
  const guild = member.guild;
  const channel = guild.systemChannel;

  try {
    await member.roles.add(process.env.EVEN_MEMBER_ROLE as string);
  } catch (error) {
    event.emit('even', 'error', (error as Error).message, {
      event: 'join',
      member: { name: member.nickname },
    });
  }

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

    if (data && data.media_type == 'image') embed.setImage(data.url);

    channel.send({
      embeds: [embed],
    });

    event.emit('even', 'success', 'New member', {
      event: 'join',
      member: { name: member.nickname },
    });
  }
};
