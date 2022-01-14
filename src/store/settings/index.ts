/*
 * @Author: JeremyJone
 * @Date: 2022-01-12 14:50:46
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-14 18:11:52
 * @Description: 用户可以自行配置的设置项
 */

import { TOOL_LIST } from '@/config/constants';
import { uuid } from '@/utils/common';
import { LocalStorage } from 'quasar';
import { Module } from 'vuex';
import {
  ADD_TOOL,
  REMOVE_TOOL,
  SAVE_USER_SETTINGS,
  SET_SEARCH_ENGINE_LIST,
  SET_TOOL_LIST
} from '../mutation-types';

const store: Module<SettingsState, RootState> = {
  namespaced: true,

  state: {
    tools: [],
    searchEngines: [],
    userSettings: {
      isSaveDefaultSearchEngine: true
    }
  },

  mutations: {
    [SET_TOOL_LIST](state, tools: Array<Tool>) {
      state.tools = tools;
    },
    [ADD_TOOL](state, tool: Tool) {
      state.tools.push({
        id: uuid(12),
        url: tool.url,
        comment: tool.comment
      });

      // 更新 localStorage
      LocalStorage.set(TOOL_LIST, JSON.stringify(state.tools));
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
    }
  }
};

export default store;
