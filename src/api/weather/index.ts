import { get } from '@/utils/http/requests';
import { weatherUrl } from '../url';

export default async function getWeather() {
  const [err, weather] = await get<{ results: Weather[] }>(weatherUrl);

  if (err || !weather) {
    if (!import.meta.env.PROD) console.error(err);
    return '天气暂时不可用';
  }

  return weather.results;
}
