/*
 * @Author: JeremyJone
 * @Date: 2022-01-11 15:50:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-12 12:34:56
 * @Description: 初始化配置
 */
import store from '@/store';
import { SET_SEARCH_ENGINE_LIST, SET_TOOL_LIST } from '@/store/mutation-types';
import { LocalStorage } from 'quasar';
import { SEARCH_ENGINE_LIST, TOOL_LIST } from './constants';
import searchEngines from './data/search-engine';
import tools from './data/tools';

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
    LocalStorage.set(TOOL_LIST, JSON.stringify(toolList));
  }

  // 设置工具列表
  store.dispatch(SET_TOOL_LIST, toolList);
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
    LocalStorage.set(SEARCH_ENGINE_LIST, JSON.stringify(searchList));
  }

  // 设置搜索引擎列表
  store.dispatch(SET_SEARCH_ENGINE_LIST, searchList);
}

export function initConfig() {
  initToolList();
  initSearchEngineList();
}

export default {};
