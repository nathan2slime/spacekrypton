import { AppI18nLang, i18n } from '@kry/i18n';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { envs } from '@kry/envs';

import {
  Elevation,
  ElevationInput,
  ResponseDataSatellite,
  ResponseElevation,
  ResponseSearchSatellite,
  Satellite,
  SatellitePositionInput,
  SatelliteSearchInput,
} from './satellite.types';
import { ResponseTrackingSatellite } from './satellite.types';

@Injectable()
export default class SatelliteService {
  async track(
    { id, latitude, longitude, elevation, seconds }: SatellitePositionInput,
    lang: AppI18nLang
  ): Promise<Satellite> {
    const URL =
      '/positions/' +
      id +
      '/' +
      latitude +
      '/' +
      longitude +
      '/' +
      elevation +
      '/' +
      seconds +
      '&apiKey=' +
      envs.SATELLITE_TRACKING_API_KEY;

    const { data, status } = await axios.get<ResponseTrackingSatellite>(URL, {
      baseURL: envs.SATELLITE_TRACKING_API_URL,
    });

    if (status == 200 && data.info.satid) {
      const {
        positions,
        info: { satid, satname },
      } = data;

      return {
        id: satid,
        name: satname,
        positions: positions.map(
          ({ sataltitude, satlatitude, satlongitude, ...position }) => ({
            ...position,
            altitude: sataltitude,
            latitude: satlatitude,
            longitude: satlongitude,
          })
        ),
      };
    }

    throw new Error(i18n[lang].err.unableTrackSatellite);
  }

  async elevation(
    { latitude, longitude }: ElevationInput,
    lang: AppI18nLang
  ): Promise<Elevation> {
    try {
      const { data, status } = await axios.get<ResponseElevation>(
        envs.ELEVATION_API_URL + '/point?lat=' + latitude + '&lon=' + longitude,
        {
          headers: {
            'x-api-key': envs.ELEVATION_API_KEY,
          },
        }
      );

      if (status == 200 && data.status == 'OK') {
        const { elevation, lat, lon } = data.result;

        return {
          elevation,
          latitude: lat,
          longitude: lon,
        };
      }

      throw new Error();
    } catch (error) {
      throw new Error(i18n[lang].err.unableTrackSatellite);
    }
  }

  async search(
    {
      elevation,
      search,
      sort,
      order,
      latitude,
      longitude,
    }: SatelliteSearchInput,
    lang: AppI18nLang
  ) {
    const {
      data: { member },
      status,
    } = await axios.get<ResponseDataSatellite>(
      '?search=' + search + '&sort=' + sort + '&sort-dir=' + order,
      { baseURL: envs.SATELLITE_DATA_API_URL }
    );

    if (status == 200) {
      if (member.length == 0) throw new Error(i18n[lang].err.noSatelliteFound);

      const data = await Promise.allSettled(
        member.slice(0, 4).map(async ({ satelliteId: id }) =>
          this.track(
            {
              elevation,
              latitude,
              longitude,
              id,
              seconds: 1,
            },
            lang
          )
        )
      );

      return data
        .filter(e => e.status === 'fulfilled')
        .map(
          satellite => (satellite as unknown as ResponseSearchSatellite).value
        );
    }

    throw new Error(i18n[lang].err.unableTrackSatellite);
  }
}
