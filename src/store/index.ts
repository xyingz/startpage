/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-06 16:16:52
 * @Description: 状态管理文件
 */

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { SET_FOCUS_MODE } from './mutation-types';

export interface State {
  focusMode: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol('store_key');

export default createStore({
  strict: true,

  state: {
    focusMode: false
  },
  mutations: {
    [SET_FOCUS_MODE](state: State, focusMode: boolean) {
      state.focusMode = focusMode;
    }
  },
  actions: {
    setFocusMode(context, focusMode: boolean) {
      context.commit(SET_FOCUS_MODE, focusMode);
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
