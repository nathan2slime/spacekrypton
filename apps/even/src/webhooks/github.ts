import { Client } from 'discordx';
import express, { Request, Response, json } from 'express';

import cors from 'cors';

import { EventEmitter } from 'events';

export const github = (event: EventEmitter) => {
  const app = express();

  app.use(cors());
  app.use(json());

  app.get('/', async (_req: Request, res: Response) => {
    event.emit('even', 'success', 'github webhook healthcheck', { ok: true });

    return res.status(200).json({ ok: true });
  });

  app.listen(process.env.WEBHOOK_GITHUB_PORT, () =>
    event.emit('even', 'info', 'github webhook started')
  );
};
