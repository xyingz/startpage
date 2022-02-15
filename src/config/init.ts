/*
 * @Author: JeremyJone
 * @Date: 2022-01-11 15:50:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-02-15 11:52:22
 * @Description: 初始化配置
 */
import store from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { isVersionGreaterThan } from '@/utils/common';
import { LocalStorage } from 'quasar';
import {
  DEFAULT_SEARCH_ENGINE_IDX,
  SEARCH_ENGINE_LIST,
  TOOL_LIST,
  USER_SETTINGS,
  VERSION,
  TODAY_BG,
  SEARCH_RECORD
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
 * 初始化用户设置项
 */
function initUserSettings() {
  const settings = LocalStorage.getItem<string>(USER_SETTINGS);
  const us = userSettings;

  // 为了方便每次新加功能可以正常实现，每次打开都将已保存的内容与默认设置合并
  if (settings) {
    Object.assign(us, JSON.parse(settings));
  }
  saveUserSettings(us);

  store.dispatch(SETTINGS.SAVE_USER_SETTINGS, us);

  // 配置是否使用聚焦模式
  store.dispatch(CONTROLLERS.SET_FOCUS_MODE, us.isDefaultFocusMode);
}

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
function initSearchEngineList(updated: boolean) {
  let searchList: Array<SearchEngine> = [];

  // 1.0.1 修改了搜索引擎内容，需要更新
  if (updated && APP_VERSION === '1.0.1') {
    searchList = searchEngines;
    saveSearchEngineList(searchList);
  } else {
    const searchListStr = LocalStorage.getItem<string>(SEARCH_ENGINE_LIST);

    if (searchListStr) {
      searchList = JSON.parse(searchListStr);
    } else {
      searchList = searchEngines;
      saveSearchEngineList(searchList);
    }
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

/**
 * 检查版本号并保存新版本号
 */
function checkVersion() {
  // 测试用，需要删除
  LocalStorage.set(VERSION, '1.0.0');

  const savedVersion = LocalStorage.getItem<string>(VERSION);
  if (savedVersion === APP_VERSION) return false;

  // 当前版本号大于保存的版本号
  if (isVersionGreaterThan(APP_VERSION, savedVersion)) {
    LocalStorage.set(VERSION, APP_VERSION);
  }

  // 如果没有参数，则保存默认值
  if (!savedVersion) {
    LocalStorage.set(VERSION, APP_VERSION);

    // 没有参数，可以理解为第一次登录
    store.dispatch(CONTROLLERS.SET_SHOW_BEGINNER_TOUR, true);
  }

  return true;
}

/**
 * 检查背景图片是否需要更新
 */
function checkBackgroundImage() {
  const bgInfo = LocalStorage.getItem<string>(TODAY_BG);
  if (bgInfo) {
    const bg: TodayBgImageInfo = JSON.parse(bgInfo);
    // 判断是否需要每日更新，如果是的话，每天第一次登录删掉字段即可
    if (
      !bg.isSavedCurrent &&
      new Date(bg.savedTime).getDate() !== new Date().getDate()
    ) {
      LocalStorage.remove(TODAY_BG);
    } else {
      store.dispatch(SETTINGS.SET_TODAY_BG, bg);
    }
  }
}

/**
 * 加载搜索记录
 */
function initSearchRecord() {
  const searchRecordStr = LocalStorage.getItem<string>(SEARCH_RECORD);
  if (searchRecordStr) {
    const searchRecord: Array<string> = JSON.parse(searchRecordStr);
    store.dispatch(SETTINGS.SET_SEARCH_RECORD, searchRecord);
  }
}

export function initConfig() {
  const updated = checkVersion();

  initUserSettings();

  initToolList();
  initSearchEngineList(updated);
  initDefaultSearchEngineIdx();
  initSearchRecord();

  checkBackgroundImage();
}

export default {};
