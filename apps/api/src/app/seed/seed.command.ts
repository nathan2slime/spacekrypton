import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { SeedService } from './seed.service';

@Injectable()
export class SeedCommand {
  constructor(private seedService: SeedService) {}

  @Command({
    command: 'seed:run',
    describe: 'Seed database',
  })
  async seed() {
    await this.seedService.admin();
  }
}
