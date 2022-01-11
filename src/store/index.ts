/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-10 17:10:37
 * @Description: 状态管理文件
 */

import { SearchEngine } from '@/typings/search';
import { Tool } from '@/typings/tool';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import searchEngines from './data/search-engine';
import tools from './data/tools';
import { SET_FOCUS_MODE, SET_SHOW_TOOLBOX } from './mutation-types';

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
    }
  },
  actions: {
    setFocusMode(context, focusMode: boolean) {
      context.commit(SET_FOCUS_MODE, focusMode);
    },

    setShowToolBox(context, isShowToolBox: boolean) {
      context.commit(SET_SHOW_TOOLBOX, isShowToolBox);
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
