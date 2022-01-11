/*
 * @Author: JeremyJone
 * @Date: 2022-01-11 15:50:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-11 16:02:40
 * @Description: 初始化配置
 */
import store from '@/store';
import { SET_TOOL_LIST } from '@/store/mutation-types';
import { Tool } from '@/typings/tool';
import { LocalStorage } from 'quasar';
import { TOOL_LIST } from './constants';
import tools from './data/tools';

export function initConfig() {
  // 从 localStorage 中获取工具列表
  const toolListStr = LocalStorage.getItem<string>(TOOL_LIST);
  let toolList: Array<Tool> = [];
  if (toolListStr) {
    toolList = JSON.parse(toolListStr);
  } else {
    toolList = tools;
    LocalStorage.set(TOOL_LIST, JSON.stringify(toolList));
  }

  // 设置工具列表
  store.dispatch(SET_TOOL_LIST, toolList);
}

export default {};
