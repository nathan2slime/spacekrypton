import express, { Request, Response, json } from 'express';
import { EventEmitter } from 'events';
import { logger } from '@kry/logger';
import { Colors, EmbedBuilder } from 'discord.js';
import { envs } from '@kry/envs';
import axios from 'axios';
import cors from 'cors';
import { log } from 'winston';

export const github = (event: EventEmitter) => {
  const app = express();

  app.use(cors());
  app.use(json());

  app.get('/', async (_req: Request, res: Response) => {
    event.emit('even', 'success', 'github webhook healthcheck', { ok: true });

    return res.status(200).json({ ok: true });
  });

  app.post('/spacekrypton', async (req: Request, res: Response) => {
    const { commits, ref, head_commit, sender } = req.body;
    console.log(req.body);

    const getEmbedData = () => {
      if (commits && ref == 'refs/heads/master') {
        return new EmbedBuilder({
          title: 'New commit',
          description: `${commits[0].message}\n\n*Author*: ${
            head_commit.author.name
          }\n*Date*: ${new Date(
            commits[0].timestamp
          ).toLocaleString()}\nModified: [${head_commit.modified}]`,
          thumbnail: {
            url: sender.avatar_url,
          },
          color: Colors.LuminousVividPink,
        }).toJSON();
      }
    };

    const embed = getEmbedData();

    if (embed) {
      try {
        await axios.post(envs.EVEN_WEBHOOK_LOGGER, {
          embeds: [embed],
        });
      } catch (error) {
        logger.log('error', (error as Error).message);
      }
    }

    return res.status(200).json({ success: true });
  });

  app.listen(process.env.WEBHOOK_GITHUB_PORT, () =>
    event.emit('even', 'info', 'github webhook started')
  );
};
