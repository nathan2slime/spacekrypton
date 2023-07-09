import axios from 'axios';

export type ApodImage = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  copyright: string;
  url: string;
};

export const getTodayApod = async (date: string) => {
  try {
    const { data, status } = await axios.get<ApodImage>(
      (process.env.NEXT_PUBLIC_NASA_APOD_API_URL as string) +
        '?api_key=' +
        process.env.NEXT_PUBLIC_NASA_API_KEY +
        '&date=' +
        date
    );

    if (status == 200) return data;
  } catch (error) {
    return;
  }
};
