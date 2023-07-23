import { Module } from '@nestjs/common';

import SatelliteService from './satellite.service';
import SatelliteResolver from './satellite.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [SatelliteService, SatelliteResolver],
})
export default class SatelliteModule {}
