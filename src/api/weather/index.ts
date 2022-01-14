import { get } from '@/utils/http/requests';

export default async function getWeather() {
  const [err, weather] = await get<{ results: Weather[] }>(
    `https://api.seniverse.com/v3/weather/now.json?key=SwOzxhRmO3o7iDBsR&location=ip&language=zh-Hans&unit=c`
  );

  if (err || !weather) {
    if (!import.meta.env.PROD) console.error(err);
    return '天气暂时不可用';
  }

  return weather.results;
}
