/* eslint-disable no-param-reassign */
/*
 * @Author: JeremyJone
 * @Date: 2022-01-05 11:53:15
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-06 14:34:22
 * @Description: 通用函数
 */

/**
 * 转换一个对象为一个数字，如果可转，则返回数字，否则返回0
 * @param str 待转对象
 * @returns 数字
 */
export function parseInt(str: any): number {
  if (typeof str === 'number') {
    return str;
  }
  if (typeof str === 'string') {
    return parseInt(str);
  }

  try {
    return parseInt(str.toString());
  } catch (error) {
    return 0;
  }
}

export default {
  parseInt
};

type FormatKey = 'M+' | 'd+' | 'h+' | 'H+' | 'm+' | 's+' | 'q+' | 'S';
export type LanguageKey = 'zh' | 'en';

/**
 * 格式化时间
 * @param date 日期对象，或一个日期字符串，对其进行格式化
 * @param fmt 格式文本，y:年，q:季度，M:月，d:日，D:星期，H:小时(24小时制)，h:小时(12小时制)，m:分钟，s:秒，S:毫秒。例：`yyyy-MM-dd`
 * @param lang 显示星期的文本，中文或者英文
 * @return 格式化的内容
 */
export function formatDate(
  date: Date | string | number,
  fmt = 'yyyy-MM-dd',
  lang: LanguageKey = 'zh'
) {
  const WEEK = {
    zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  };

  if (['zh', 'en'].indexOf(lang) === -1) lang = 'zh';

  date = new Date(date);

  const o: Record<FormatKey, number> = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };

  let k: keyof Record<FormatKey, number>;
  // eslint-disable-next-line no-restricted-syntax
  for (k in o)
    if (new RegExp(`(${k})`).test(fmt)) {
      const v = o[k].toString();
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? v : `00${v}`.substr(`${v}`.length)
      );
    }

  // 年份
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  // 星期
  if (/(D+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, WEEK[lang][date.getDay()]);
  }
  return fmt;
}
