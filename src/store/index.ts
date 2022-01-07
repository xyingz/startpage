/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-07 15:37:30
 * @Description: 状态管理文件
 */

import { Tool } from '@/typings/tool';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { SET_FOCUS_MODE } from './mutation-types';

export interface State {
  focusMode: boolean;
  tools: Array<Tool>;
}

export const key: InjectionKey<Store<State>> = Symbol('store_key');

export default createStore({
  strict: true,

  state: {
    focusMode: false,
    tools: [
      {
        id: '1',
        name: 'google',
        icon: 'google',
        favicon: 'https://www.google.com/favicon.ico',
        url: 'https://www.google.com',
        comment: 'Google'
      },
      {
        id: '2',
        name: 'netdesk',
        icon: 'netdesk',
        favicon:
          'https://pan.baidu.com/m-static/base/static/images/favicon.ico',
        url: 'https://pan.baidu.com',
        comment: '百度网盘'
      }
    ]
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
