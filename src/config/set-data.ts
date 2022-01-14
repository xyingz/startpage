/*
 * @Author: JeremyJone
 * @Date: 2022-01-14 17:26:25
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-14 17:29:19
 * @Description: 保存数据到本地
 */

import { LocalStorage } from 'quasar';
import {
  DEFAULT_SEARCH_ENGINE_IDX,
  SEARCH_ENGINE_LIST,
  TOOL_LIST
} from './constants';

/**
 * 保存工具列表
 */
export function saveToolList(toolList: Array<Tool>) {
  LocalStorage.set(TOOL_LIST, JSON.stringify(toolList));
}

/**
 * 保存搜索引擎列表
 */
export function saveSearchEngineList(searchList: Array<SearchEngine>) {
  LocalStorage.set(SEARCH_ENGINE_LIST, JSON.stringify(searchList));
}

/**
 * 保存默认搜索引擎索引
 */
export function saveDefaultSearchEngineIdx(idx: number) {
  LocalStorage.set(DEFAULT_SEARCH_ENGINE_IDX, idx);
}

export default {};
