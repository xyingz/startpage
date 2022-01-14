import { get } from '@/utils/http/requests';

export default async function getLunar() {
  const [err, weather] = await get<{ results: { chinese_calendar: Lunar[] } }>(
    `https://api.seniverse.com/v3/life/chinese_calendar.json?key=SwOzxhRmO3o7iDBsR`
  );

  if (err || !weather) {
    if (!import.meta.env.PROD) console.error(err);
    return '日历暂时不可用';
  }

  return weather.results.chinese_calendar;
}
