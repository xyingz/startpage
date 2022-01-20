/*
 * @Author: JeremyJone
 * @Date: 2022-01-20 16:57:49
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-20 17:03:46
 * @Description: url 配置
 */

const key = 'SwOzxhRmO3o7iDBsR';

export const weatherUrl = `https://api.seniverse.com/v3/weather/now.json?key=${key}&location=ip&language=zh-Hans&unit=c`;
export const lunarUrl = `https://api.seniverse.com/v3/life/chinese_calendar.json?key=${key}`;

export const iconUrl = `https://ico.kucat.cn/get.php`;
export const imageUrl = `https://api.xiaopangying.com/image/bing`;

export default {};
