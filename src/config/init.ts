/*
 * @Author: JeremyJone
 * @Date: 2022-01-11 15:50:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-14 17:37:19
 * @Description: 初始化配置
 */
import store from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { LocalStorage } from 'quasar';
import {
  DEFAULT_SEARCH_ENGINE_IDX,
  SEARCH_ENGINE_LIST,
  TOOL_LIST
} from './constants';
import searchEngines from './data/search-engine';
import tools from './data/tools';
import {
  saveDefaultSearchEngineIdx,
  saveSearchEngineList,
  saveToolList
} from './set-data';

/**
 * 初始化工具列表
 */
function initToolList() {
  const toolListStr = LocalStorage.getItem<string>(TOOL_LIST);
  let toolList: Array<Tool> = [];

  if (toolListStr) {
    toolList = JSON.parse(toolListStr);
  } else {
    toolList = tools;
    saveToolList(toolList);
  }

  // 设置工具列表
  store.dispatch(SETTINGS.SET_TOOL_LIST, toolList);
}

/**
 * 初始化搜索引擎列表
 */
function initSearchEngineList() {
  const searchListStr = LocalStorage.getItem<string>(SEARCH_ENGINE_LIST);
  let searchList: Array<SearchEngine> = [];

  if (searchListStr) {
    searchList = JSON.parse(searchListStr);
  } else {
    searchList = searchEngines;
    saveSearchEngineList(searchList);
  }

  // 设置搜索引擎列表
  store.dispatch(SETTINGS.SET_SEARCH_ENGINE_LIST, searchList);
}

/**
 * 初始化默认搜索引擎索引
 */
function initDefaultSearchEngineIdx() {
  const defaultEngineIdx = LocalStorage.getItem<number>(
    DEFAULT_SEARCH_ENGINE_IDX
  );

  if (typeof defaultEngineIdx === 'number') {
    store.dispatch(CONTROLLERS.SET_SEARCH_ENGINE_IDX, defaultEngineIdx);
  } else {
    saveDefaultSearchEngineIdx(0);
  }
}

export function initConfig() {
  initToolList();
  initSearchEngineList();
  initDefaultSearchEngineIdx();
}

export default {};
