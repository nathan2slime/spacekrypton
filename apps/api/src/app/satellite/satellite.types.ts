import { Field, InputType, ObjectType } from 'type-graphql';

import { SatelliteOrder, SatelliteSort } from '../models/enums/satellite';

@ObjectType()
export class Satellite {
  @Field()
  name: string;

  @Field()
  id: number;

  @Field(() => [SatellitePosition])
  positions: SatellitePosition[];
}

@ObjectType()
@ObjectType()
export class SatellitePosition {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field()
  azimuth: number;

  @Field()
  elevation: number;

  @Field()
  ra: number;

  @Field()
  dec: number;

  @Field()
  timestamp: number;

  @Field(() => Boolean)
  eclipsed: boolean;
}

@InputType()
@ObjectType()
export class ElevationInput {
  @Field()
  longitude: number;

  @Field()
  latitude: number;
}

@InputType()
@ObjectType()
export class SatelliteSearchInput {
  @Field(() => SatelliteSort)
  sort: SatelliteSort;

  @Field(() => SatelliteOrder)
  order: SatelliteOrder;

  @Field()
  search: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  elevation: number;
}

@ObjectType()
export class Elevation {
  @Field()
  elevation: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@InputType()
@ObjectType()
export class SatellitePositionInput {
  @Field()
  id: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  elevation: number;

  @Field({ defaultValue: 1 })
  seconds: number;
}

@ObjectType()
export class PositionTrackingSatellite {
  @Field()
  satlatitude: number;

  @Field()
  ra: number;

  @Field()
  satlongitude: number;

  @Field()
  sataltitude: number;

  @Field()
  azimuth: number;

  @Field()
  elevation: number;

  @Field()
  dec: number;

  @Field()
  timestamp: number;

  @Field()
  eclipsed: boolean;

  @Field()
  radius: number;
}

@ObjectType()
export class ResponseElevationResults {
  @Field()
  elevation: number;

  @Field()
  lat: number;

  @Field()
  lon: number;

  @Field()
  data_source: string;

  @Field()
  resolution: number;
}

@ObjectType()
export class ResponseElevation {
  @Field()
  result: ResponseElevationResults;

  @Field()
  status: string;
}

@ObjectType()
export class InfoTrackingSatellite {
  @Field()
  satid: number;

  @Field()
  satname: string;
}

@ObjectType()
export class ResponseSearchSatellite {
  @Field()
  status: 'rejected' | 'fulfilled';

  @Field(() => Satellite)
  value: Satellite;
}

@ObjectType()
export class ResponseTrackingSatellite {
  @Field()
  info: InfoTrackingSatellite;

  @Field(() => [PositionTrackingSatellite])
  positions: PositionTrackingSatellite[];
}

@ObjectType()
export class MemberDataSatellite {
  @Field()
  name: string;

  @Field()
  satelliteId: number;
}

@ObjectType()
export class ResponseDataSatellite {
  @Field(() => [MemberDataSatellite])
  member: MemberDataSatellite[];
}
