/*
 * @Author: JeremyJone
 * @Date: 2022-01-05 11:53:15
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-05 11:56:38
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
