import axios from 'axios';
import { envs } from '@kry/envs';

import { HoverImagePayload, MarsPhotos } from './types';

export const getHoverMars = async (
  payload: HoverImagePayload
): Promise<MarsPhotos> => {
  try {
    const { rover, sun, camera, date, page } = payload;

    const { status, data } = await axios.get<MarsPhotos>(
      envs.NASA_API_URL +
        `mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos${
          sun ? '?sol=' + sun + '&' : '?'
        }api_key=${envs.NASA_API_KEY}&camera=${camera.toLowerCase()}${
          date ? '&earth_date=' + date : ''
        }&page=${page || 1}`
    );

    if (status == 200) return data;

    throw new Error();
  } catch (error) {
    return { photos: [] };
  }
};
