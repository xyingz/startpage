/*
 * @Author: JeremyJone
 * @Date: 2022-01-12 14:36:57
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-25 11:05:22
 * @Description: 程序内部控制变量模块
 */

import { Module } from 'vuex';
import {
  GET_SEARCH_ENGINE_INDEX,
  SET_BACKGROUND_IMAGE,
  SET_FIRST_VISIT,
  SET_FOCUS_MODE,
  SET_REMOVE_TOOL_STATE,
  SET_SEARCH_ENGINE_IDX,
  SET_SHOW_TOOLBOX
} from '../mutation-types';

const store: Module<ControllersState, RootState> = {
  namespaced: true,

  state: {
    focusMode: false,
    isShowToolBox: false,
    removeToolState: false,
    defaultEngineIdx: 0,
    backgroundImage: undefined,
    isFirstVisit: false
  },

  getters: {
    [GET_SEARCH_ENGINE_INDEX]: (state, getters, rootState) => {
      return state.defaultEngineIdx >= 0 &&
        state.defaultEngineIdx < rootState.settings.searchEngines.length
        ? state.defaultEngineIdx
        : 0;
    }
  },

  mutations: {
    [SET_FOCUS_MODE](state, focusMode: boolean) {
      state.focusMode = focusMode;
    },
    [SET_SHOW_TOOLBOX](state, isShowToolBox: boolean) {
      state.isShowToolBox = isShowToolBox;
    },
    [SET_REMOVE_TOOL_STATE](state, removeToolState: boolean) {
      state.removeToolState = removeToolState;
    },
    [SET_SEARCH_ENGINE_IDX](state, idx: number) {
      state.defaultEngineIdx = idx;
    },
    [SET_BACKGROUND_IMAGE](state, backgroundImage: BackgroundImage) {
      state.backgroundImage = backgroundImage;
    },
    [SET_FIRST_VISIT](state, isFirstVisit: boolean) {
      state.isFirstVisit = isFirstVisit;
    }
  },
  actions: {
    [SET_FOCUS_MODE](context, focusMode: boolean) {
      context.commit(SET_FOCUS_MODE, focusMode);
    },

    [SET_SHOW_TOOLBOX](context, isShowToolBox: boolean) {
      context.commit(SET_SHOW_TOOLBOX, isShowToolBox);
    },

    [SET_REMOVE_TOOL_STATE](context, removeToolState: boolean) {
      context.commit(SET_REMOVE_TOOL_STATE, removeToolState);
    },
    [SET_SEARCH_ENGINE_IDX](context, idx: number) {
      let index = 0;
      if (idx >= 0 && idx < context.rootState.settings.searchEngines.length) {
        index = idx;
      }
      context.commit(SET_SEARCH_ENGINE_IDX, index);
    },
    [SET_BACKGROUND_IMAGE](context, backgroundImage: BackgroundImage) {
      context.commit(SET_BACKGROUND_IMAGE, backgroundImage);
    },
    [SET_FIRST_VISIT](context, isFirstVisit: boolean) {
      context.commit(SET_FIRST_VISIT, isFirstVisit);
    }
  }
};

export default store;
