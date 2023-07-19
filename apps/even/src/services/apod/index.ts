import axios from 'axios';
import { envs } from '@kry/envs';

import { ApodImage } from './types';

export const getTodayApod = async (date: string) => {
  try {
    const { data, status } = await axios.get<ApodImage>(
      (envs.NASA_API_URL as string) +
        'planetary/apod?api_key=' +
        envs.NASA_API_KEY +
        '&date=' +
        date
    );

    if (status == 200) return data;
  } catch (error) {
    return;
  }
};
