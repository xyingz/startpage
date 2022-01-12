/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-12 15:17:48
 * @Description: 状态管理文件
 */

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import controllers from './controllers';
import settings from './settings';

export const key: InjectionKey<Store<RootState>> = Symbol('store_key');

export default createStore({
  strict: true,

  modules: { controllers, settings }
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
