import { get } from '@/utils/http/requests';

export default async function getWeather() {
  // const ip = returnCitySN.cip;

  const [vErr, visitor] = await get<any>(
    'https://api.uomg.com/api/visitor.info?skey=774740085'
  );

  if (vErr) {
    return '天气暂时不可用';
  }

  const [err, weather] = await get<{ results: Weather[] }>(
    `https://api.seniverse.com/v3/weather/now.json?key=SwOzxhRmO3o7iDBsR&location=${visitor.ip}&language=zh-Hans&unit=c`
  );

  if (err || !weather) {
    if (!import.meta.env.PROD) console.error(err);
    return '天气暂时不可用';
  }

  return weather.results;
}
