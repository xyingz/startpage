/*
 * @Author: JeremyJone
 * @Date: 2022-01-20 16:57:49
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-03-02 10:21:29
 * @Description: url 配置
 */

// const key = 'SwOzxhRmO3o7iDBsR'; // 过期
const key = 'SRAvSpXZtbZvpCTqj';

export const weatherUrl = `https://api.seniverse.com/v3/weather/now.json?key=${key}&location=ip&language=zh-Hans&unit=c`;
// 无用
// export const lunarUrl = `https://api.seniverse.com/v3/life/chinese_calendar.json?key=${key}`;

export const iconUrl = `https://ico.kucat.cn/get.php`;
export const imageUrl = `https://api.xiaopangying.com/image/bing`;

// 搜索建议url
// export const suggestionUrl = `https://suggestion.baidu.com/su?p=3&ie=UTF-8&cb=&wd=`;
export const suggestionUrl = `https://api.xiaopangying.com/search/suggest?wd=`;

export default {};
