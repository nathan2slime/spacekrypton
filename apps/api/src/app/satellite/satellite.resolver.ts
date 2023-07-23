import { Injectable } from '@nestjs/common';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import SatelliteService from './satellite.service';
import {
  Elevation,
  ElevationInput,
  Satellite,
  SatellitePositionInput,
  SatelliteSearchInput,
} from './satellite.types';
import { ContextDataType } from '../../auth/types';

@Injectable()
@Resolver()
export default class SatelliteResolver {
  constructor(private readonly satelliteService: SatelliteService) {}

  @Query(() => Satellite, { name: 'TrackSatellite' })
  async track(
    @Ctx() ctx: ContextDataType,
    @Arg('data') data: SatellitePositionInput
  ) {
    return await this.satelliteService.track(data, ctx.lang);
  }

  @Query(() => Elevation, { name: 'Elevation' })
  async elevation(
    @Arg('data') data: ElevationInput,
    @Ctx() ctx: ContextDataType
  ): Promise<Elevation> {
    return await this.satelliteService.elevation(data, ctx.lang);
  }

  @Query(() => [Satellite], { name: 'SearchSatellite' })
  async search(
    @Arg('data') data: SatelliteSearchInput,
    @Ctx() ctx: ContextDataType
  ): Promise<Satellite[]> {
    return await this.satelliteService.search(data, ctx.lang);
  }
}
