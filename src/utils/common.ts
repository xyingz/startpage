/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/*
 * @Author: JeremyJone
 * @Date: 2022-01-05 11:53:15
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-25 10:59:02
 * @Description: 通用函数
 */

import { isAndroid, isDeviceMobile, isIos } from './check';

/**
 * 生成uuid
 * @param len 指定uuid的长度
 * @param radix 进制，默认16进制
 */
export function uuid(len: number, radix = 16): string {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const res = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) res[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    // eslint-disable-next-line no-multi-assign
    res[8] = res[13] = res[18] = res[23] = '-';
    res[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!res[i]) {
        r = 0 | (Math.random() * 16);
        res[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return res.join('');
}

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

/**
 * 处理移动端键盘响应的事件
 * @param showCb 呼出时回调函数
 * @param hideCb 收起时回调函数
 */
export function mobileKeyboardCallback(showCb: Function, hideCb: Function) {
  if (!isDeviceMobile()) return;

  if (isIos()) {
    window.onload = () => {
      document.body.addEventListener('focusin', () => {
        showCb();
      });
      document.body.addEventListener('focusout', () => {
        hideCb();
      });
    };
  } else if (isAndroid()) {
    const originHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    window.onload = () => {
      window.addEventListener('resize', () => {
        const height =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (height < originHeight) {
          showCb();
        } else {
          hideCb();
        }
      });
    };
  }
}

/**
 * 随机获取数组中的一项
 * @param arr
 */
export function random(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 添加 class
 */
export function addClass(el: HTMLElement, className: string) {
  if (el.classList.contains(className)) return;
  el.classList.add(className);
}

/**
 * 移除 class
 */
export function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className);
}

/**
 * 判断版本是否高于某个版本
 */
export function isVersionGreaterThan(
  version?: string | null,
  compareVersion?: string | null
) {
  if (!version) return false;

  if (!compareVersion) {
    compareVersion = APP_VERSION;
  }

  const v = version.split('.');
  const c = compareVersion.split('.');

  for (let i = 0; i < v.length; i++) {
    if (parseInt(v[i], 10) > parseInt(c[i], 10)) return true;
    if (parseInt(v[i], 10) < parseInt(c[i], 10)) return false;
  }
  return false;
}
