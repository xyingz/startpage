// import { get } from '@/utils/http/requests';
// import { lunarUrl } from '../url';

// export default async function getLunar() {
//   const [err, weather] = await get<{ results: { chinese_calendar: Lunar[] } }>(
//     lunarUrl
//   );

//   if (err || !weather) {
//     if (!import.meta.env.PROD) console.error(err);
//     return '日历暂时不可用';
//   }

//   return weather.results.chinese_calendar;
// }
