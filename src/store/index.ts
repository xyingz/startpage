/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-11 12:21:19
 * @Description: 状态管理文件
 */

import { SearchEngine } from '@/typings/search';
import { Tool } from '@/typings/tool';
import { uuid } from '@/utils/common';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import searchEngines from './data/search-engine';
import tools from './data/tools';
import { ADD_TOOL, SET_FOCUS_MODE, SET_SHOW_TOOLBOX } from './mutation-types';

export interface State {
  focusMode: boolean;
  tools: Array<Tool>;
  isShowToolBox: boolean;
  searchEngines: Array<SearchEngine>;
}

export const key: InjectionKey<Store<State>> = Symbol('store_key');

export default createStore({
  strict: true,

  state: {
    focusMode: false,
    isShowToolBox: false,
    tools,
    searchEngines
  },
  mutations: {
    [SET_FOCUS_MODE](state: State, focusMode: boolean) {
      state.focusMode = focusMode;
    },
    [SET_SHOW_TOOLBOX](state: State, isShowToolBox: boolean) {
      state.isShowToolBox = isShowToolBox;
    },
    [ADD_TOOL](state: State, tool: Tool) {
      state.tools.push({
        id: uuid(12),
        url: tool.url,
        comment: tool.comment
      });
    }
  },
  actions: {
    [SET_FOCUS_MODE](context, focusMode: boolean) {
      context.commit(SET_FOCUS_MODE, focusMode);
    },

    [SET_SHOW_TOOLBOX](context, isShowToolBox: boolean) {
      context.commit(SET_SHOW_TOOLBOX, isShowToolBox);
    },

    [ADD_TOOL](context, tool: Tool) {
      context.commit(ADD_TOOL, tool);
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
