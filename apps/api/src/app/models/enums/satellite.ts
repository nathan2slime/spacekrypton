import { registerEnumType } from 'type-graphql';

export enum SatelliteSort {
  ID = 'id',
  NAME = 'name',
  POPULARITY = 'popularity',
  INCLINATION = 'inclination',
  ECCENTRICITY = 'eccentricity',
  PERIOD = 'period',
}

export enum SatelliteOrder {
  DESC = 'desc',
  ASC = 'asc',
}

registerEnumType(SatelliteSort, { name: 'SatelliteSort' });
registerEnumType(SatelliteOrder, { name: 'SatelliteOrder' });
