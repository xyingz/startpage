/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-11 16:09:36
 * @Description: 状态管理文件
 */

import { uuid } from '@/utils/common';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { LocalStorage } from 'quasar';
import { TOOL_LIST } from '@/config/constants';
import searchEngines from '../config/data/search-engine';
import {
  ADD_TOOL,
  REMOVE_TOOL,
  SET_FOCUS_MODE,
  SET_REMOVE_TOOL_STATE,
  SET_SHOW_TOOLBOX,
  SET_TOOL_LIST
} from './mutation-types';

export interface State {
  focusMode: boolean;
  tools: Array<Tool>;
  isShowToolBox: boolean;
  searchEngines: Array<SearchEngine>;
  removeToolState: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol('store_key');

export default createStore({
  strict: true,

  state: {
    focusMode: false,
    isShowToolBox: false,
    tools: [],
    searchEngines,
    removeToolState: false
  },
  mutations: {
    [SET_FOCUS_MODE](state: State, focusMode: boolean) {
      state.focusMode = focusMode;
    },
    [SET_SHOW_TOOLBOX](state: State, isShowToolBox: boolean) {
      state.isShowToolBox = isShowToolBox;
    },
    [SET_TOOL_LIST](state: State, tools: Array<Tool>) {
      state.tools = tools;
    },
    [ADD_TOOL](state: State, tool: Tool) {
      state.tools.push({
        id: uuid(12),
        url: tool.url,
        comment: tool.comment
      });

      // 更新 localStorage
      LocalStorage.set(TOOL_LIST, JSON.stringify(state.tools));
    },
    [REMOVE_TOOL](state: State, tool: Tool) {
      const index = state.tools.findIndex(item => item.id === tool.id);
      if (index !== -1) {
        state.tools.splice(index, 1);
      }

      // 更新 localStorage
      LocalStorage.set(TOOL_LIST, JSON.stringify(state.tools));
    },
    [SET_REMOVE_TOOL_STATE](state: State, removeToolState: boolean) {
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

    [SET_TOOL_LIST](content, toolList: Array<Tool>) {
      content.commit(SET_TOOL_LIST, toolList);
    },

    [ADD_TOOL](context, tool: Tool) {
      context.commit(ADD_TOOL, tool);
    },
    [REMOVE_TOOL](context, tool: Tool) {
      context.commit(REMOVE_TOOL, tool);
    },
    [SET_REMOVE_TOOL_STATE](context, removeToolState: boolean) {
      context.commit(SET_REMOVE_TOOL_STATE, removeToolState);
    }
  },
  modules: {}
});

/**
 * 定义自己的 `useStore` 组合式函数
 * 使用时，只需要引入该方法：
 *     import { useStore } from './store'
 *
 * 即可使用。
 *     setup() {
 *         const store = useStore();
 *         store.state.count // 类型为 number
 *     }
 */
export function useStore() {
  return baseUseStore(key);
}
