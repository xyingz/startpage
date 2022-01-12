/*
 * @Author: JeremyJone
 * @Date: 2022-01-12 14:36:57
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-12 15:18:06
 * @Description: 程序内部控制变量模块
 */

import { Module } from 'vuex';
import {
  SET_FOCUS_MODE,
  SET_REMOVE_TOOL_STATE,
  SET_SHOW_TOOLBOX
} from '../mutation-types';

const store: Module<ControllersState, RootState> = {
  namespaced: true,

  state: {
    focusMode: false,
    isShowToolBox: false,
    removeToolState: false
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
    }
  }
};

export default store;
