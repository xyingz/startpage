/*
 * @Author: JeremyJone
 * @Date: 2022-01-14 17:26:25
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-14 18:09:40
 * @Description: 保存数据到本地
 */

import store from '@/store';
import { LocalStorage } from 'quasar';
import {
  DEFAULT_SEARCH_ENGINE_IDX,
  SEARCH_ENGINE_LIST,
  TOOL_LIST,
  USER_SETTINGS
} from './constants';
import { userSettings } from './data/user-settings';

/**
 * 保存用户设置项
 */
export function saveUserSettings(settings: object) {
  LocalStorage.set(
    USER_SETTINGS,
    JSON.stringify(Object.assign(userSettings, settings))
  );
}

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
  // 如果用户设置了不保存，就不操作了
  if (!store.state.settings.userSettings.isSaveDefaultSearchEngine) return;

  LocalStorage.set(DEFAULT_SEARCH_ENGINE_IDX, idx);
}

export default {};
