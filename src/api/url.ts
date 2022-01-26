/*
 * @Author: JeremyJone
 * @Date: 2022-01-20 16:57:49
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-26 17:05:36
 * @Description: url 配置
 */

// const key = 'SwOzxhRmO3o7iDBsR'; // 过期
const key = 'SRAvSpXZtbZvpCTqj';

export const weatherUrl = `https://api.seniverse.com/v3/weather/now.json?key=${key}&location=ip&language=zh-Hans&unit=c`;
// 无用
// export const lunarUrl = `https://api.seniverse.com/v3/life/chinese_calendar.json?key=${key}`;

export const iconUrl = `https://ico.kucat.cn/get.php`;
export const imageUrl = `https://api.xiaopangying.com/image/bing`;

export default {};
