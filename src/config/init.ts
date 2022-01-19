/*
 * @Author: JeremyJone
 * @Date: 2022-01-11 15:50:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-19 10:27:03
 * @Description: 初始化配置
 */
import store from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { LocalStorage } from 'quasar';
import {
  CURRENT_VERSION,
  DEFAULT_SEARCH_ENGINE_IDX,
  SEARCH_ENGINE_LIST,
  TOOL_LIST,
  USER_SETTINGS
} from './constants';
import searchEngines from './data/search-engine';
import tools from './data/tools';
import { userSettings } from './data/user-settings';
import {
  saveDefaultSearchEngineIdx,
  saveSearchEngineList,
  saveToolList,
  saveUserSettings
} from './set-data';

/**
 * 当前版本
 */
const currentVersion = 1;

/**
 * 获取版本号
 */
function getCurrentVersion() {
  return LocalStorage.getItem<number>(CURRENT_VERSION);
}

/**
 * 初始化用户设置项
 */
function initUserSettings() {
  const settings = LocalStorage.getItem<string>(USER_SETTINGS);
  const us = userSettings;

  if (settings) {
    Object.assign(us, JSON.parse(settings));
  } else {
    saveUserSettings(us);
  }

  store.dispatch(SETTINGS.SAVE_USER_SETTINGS, us);

  // 配置是否使用聚焦模式
  store.dispatch(CONTROLLERS.SET_FOCUS_MODE, us.isDefaultFocusMode);
}

/**
 * 初始化工具列表
 */
function initToolList() {
  let toolListStr = null;

  const cv = getCurrentVersion();
  if (cv !== null && cv === currentVersion) {
    toolListStr = LocalStorage.getItem<string>(TOOL_LIST);
  }

  let toolList: Array<Tool> = [];

  if (toolListStr !== null) {
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
  initUserSettings();

  initToolList();
  initSearchEngineList();
  initDefaultSearchEngineIdx();

  // 保存当前版本号
  LocalStorage.set(CURRENT_VERSION, currentVersion);
}

export default {};
