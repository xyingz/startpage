/*
 * @Author: JeremyJone
 * @Date: 2022-01-12 14:50:46
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-03-21 11:42:27
 * @Description: 用户可以自行配置的设置项
 */

import { LocalStorage } from 'quasar';
import { Module } from 'vuex';
import { TOOL_LIST } from '@/config/constants';
import { uuid } from '@/utils/common';
import GlobalConfig from '@/config/global';
import { userSettings } from '@/config/data/user-settings';
import {
  ADD_NOTE,
  ADD_TOOL,
  CLEAR_SEAECH_RECORD,
  DELETE_NOTE,
  DELETE_SEARCH_RECORD,
  GET_NOTES_MAX_Z_INDEX,
  REMOVE_TOOL,
  SAVE_USER_SETTINGS,
  SET_NOTES,
  SET_SEARCH_ENGINE_LIST,
  SET_SEARCH_RECORD,
  SET_TODAY_BG,
  SET_TOOL_LIST,
  UPDATE_NOTE
} from '../mutation-types';

const store: Module<SettingsState, RootState> = {
  namespaced: true,

  state: {
    tools: [],
    searchEngines: [],
    searchRecord: [],
    userSettings,
    notes: []
  },

  getters: {
    [GET_NOTES_MAX_Z_INDEX]: state => {
      let zIndex = 1;
      if (state.notes?.length > 0) {
        zIndex = state.notes.reduce((max, note) => {
          return Math.max(max, note.zIndex ?? 1);
        }, 1);
      }

      return zIndex;
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
    },
    [SET_SEARCH_RECORD](state, record: string | Array<string>) {
      const list = state.searchRecord ?? [];
      if (Array.isArray(record)) {
        record.forEach(r => {
          const i = list.indexOf(r);
          if (i === -1) {
            list.push(r);
          } else {
            list.splice(i, 1);
            list.push(r);
          }
        });
      } else {
        const i = list.indexOf(record);
        if (i !== -1) list.splice(i, 1);

        list.unshift(record);
      }

      // 只保留最新的记录
      if (list?.length > GlobalConfig.searchRecordLength) {
        list.splice(
          GlobalConfig.searchRecordLength,
          list.length - GlobalConfig.searchRecordLength
        );
      }

      state.searchRecord = list;
    },
    [CLEAR_SEAECH_RECORD](state) {
      state.searchRecord = [];
    },
    [DELETE_SEARCH_RECORD](state, record: string) {
      const list = state.searchRecord ?? [];
      const index = list.findIndex(item => item === record);
      if (index !== -1) {
        list.splice(index, 1);
      }

      state.searchRecord = list;
    },
    [ADD_NOTE](state, note?: Note) {
      const n = { id: uuid(12), content: '', ...note };
      state.notes?.push(n);
    },
    [UPDATE_NOTE](state, note: Note) {
      const list = state.notes ?? [];
      const index = list.findIndex(item => item.id === note.id);
      if (index !== -1) {
        list.splice(index, 1, note);
      }

      state.notes = list;
    },
    [DELETE_NOTE](state, note: Note) {
      const list = state.notes ?? [];
      const index = list.findIndex(item => item.id === note.id);
      if (index !== -1) {
        list.splice(index, 1);
      }

      state.notes = list;
    },
    [SET_NOTES](state, notes: Array<Note>) {
      state.notes = notes;
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
    },
    [SET_SEARCH_RECORD](context, record: string | Array<string>) {
      context.commit(SET_SEARCH_RECORD, record);
    },
    [CLEAR_SEAECH_RECORD](context) {
      context.commit(CLEAR_SEAECH_RECORD);
    },
    [DELETE_SEARCH_RECORD](context, record: string) {
      context.commit(DELETE_SEARCH_RECORD, record);
    },
    [ADD_NOTE](context, note: Note) {
      context.commit(ADD_NOTE, note);
    },
    [DELETE_NOTE](context, note: Note) {
      context.commit(DELETE_NOTE, note);
    },
    [UPDATE_NOTE](context, note: Note) {
      context.commit(UPDATE_NOTE, note);
    },
    [SET_NOTES](context, notes: Array<Note>) {
      context.commit(SET_NOTES, notes);
    }
  }
};

export default store;
