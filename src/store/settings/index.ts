/*
 * @Author: JeremyJone
 * @Date: 2022-01-12 14:50:46
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-02-10 17:20:30
 * @Description: 用户可以自行配置的设置项
 */

import { LocalStorage } from 'quasar';
import { Module } from 'vuex';
import { TOOL_LIST } from '@/config/constants';
import { uuid } from '@/utils/common';
import {
  ADD_TOOL,
  REMOVE_TOOL,
  SAVE_USER_SETTINGS,
  SET_SEARCH_ENGINE_LIST,
  SET_TODAY_BG,
  SET_TOOL_LIST
} from '../mutation-types';

const store: Module<SettingsState, RootState> = {
  namespaced: true,

  state: {
    tools: [],
    searchEngines: [],
    userSettings: {
      isSaveDefaultSearchEngine: true,
      toolRadius: 10,
      isDefaultFocusMode: true,
      isShowInfoPanel: true,
      minBlur: 0,
      maxBlur: 20
    }
  },

  mutations: {
    [SET_TOOL_LIST](state, tools: Array<Tool>) {
      state.tools = tools;
    },
    [ADD_TOOL](state, tool: Tool) {
      const index = state.tools.findIndex(item => item.id === tool.id);
      if (index === -1 && state.tools.length < 24) {
        state.tools.push({
          id: tool.id ?? uuid(12),
          url: tool.url,
          name: tool.name
        });

        // 更新 localStorage
        LocalStorage.set(TOOL_LIST, JSON.stringify(state.tools));
      }
    },
    [REMOVE_TOOL](state, tool: Tool) {
      const index = state.tools.findIndex(item => item.id === tool.id);
      if (index !== -1) {
        state.tools.splice(index, 1);
      }

      // 更新 localStorage
      LocalStorage.set(TOOL_LIST, JSON.stringify(state.tools));
    },
    [SET_SEARCH_ENGINE_LIST](state, list: Array<SearchEngine>) {
      state.searchEngines = list;
    },
    [SAVE_USER_SETTINGS](state, settings: object) {
      Object.assign(state.userSettings, settings);
    },
    [SET_TODAY_BG](state, info: TodayBgImageInfo) {
      if (!state.todayBgImageInfo) {
        state.todayBgImageInfo = info;
      } else {
        state.todayBgImageInfo = Object.assign(state.todayBgImageInfo, info);
      }
    }
  },
  actions: {
    [SET_TOOL_LIST](content, toolList: Array<Tool>) {
      content.commit(SET_TOOL_LIST, toolList);
    },

    [ADD_TOOL](context, tool: Tool) {
      context.commit(ADD_TOOL, tool);
    },
    [REMOVE_TOOL](context, tool: Tool) {
      context.commit(REMOVE_TOOL, tool);
    },
    [SET_SEARCH_ENGINE_LIST](context, list: Array<SearchEngine>) {
      context.commit(SET_SEARCH_ENGINE_LIST, list);
    },
    [SAVE_USER_SETTINGS](context, settings: object) {
      context.commit(SAVE_USER_SETTINGS, settings);
    },
    [SET_TODAY_BG](context, info: TodayBgImageInfo) {
      context.commit(SET_TODAY_BG, info);
    }
  }
};

export default store;
