import {
  QueryTrackSatelliteArgs,
  QueryElevationArgs,
  QuerySearchSatelliteArgs,
  TrackSatelliteDocument,
  ElevationDocument,
  SearchSatelliteDocument,
  Query,
} from '@kry/types';
import { AppI18nLang } from '@kry/i18n';

import graphql from '@/graphql';

export class SatelliteServices {
  lang?: AppI18nLang;

  constructor(lang: AppI18nLang) {
    this.lang = lang;
  }

  async tracker(payload: QueryTrackSatelliteArgs) {
    return await graphql<Query, QueryTrackSatelliteArgs>({
      query: TrackSatelliteDocument,
      type: 'query',
      lang: this.lang,
      variables: payload,
      notify: false,
    });
  }

  async getElevation(payload: QueryElevationArgs) {
    return await graphql<Query, QueryElevationArgs>({
      query: ElevationDocument,
      type: 'query',
      lang: this.lang,
      variables: payload,
      notify: false,
    });
  }

  async search(payload: QuerySearchSatelliteArgs) {
    return await graphql<Query, QuerySearchSatelliteArgs>({
      query: SearchSatelliteDocument,
      type: 'query',
      lang: this.lang,
      variables: payload,
      notify: false,
    });
  }
}
