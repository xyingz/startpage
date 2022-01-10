/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:18:03
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-10 14:16:30
 * @Description: 状态管理文件
 */

import { Tool } from '@/typings/tool';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { SET_FOCUS_MODE, SET_SHOW_TOOLBOX } from './mutation-types';

export interface State {
  focusMode: boolean;
  tools: Array<Tool>;
  isShowToolBox: boolean;
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
      },
      {
        id: '3',
        name: 'github',
        icon: 'github',
        favicon: 'https://github.githubassets.com/favicon.ico',
        url: 'https://github.com',
        comment: 'GitHub'
      },
      {
        id: '4',
        name: 'jd',
        icon: 'jd',
        favicon: 'https://www.jd.com/favicon.ico',
        url: 'https://www.jd.com',
        comment: '京东'
      },
      {
        id: '5',
        name: 'bilibili',
        icon: 'bilibili',
        favicon: 'https://www.bilibili.com/favicon.ico',
        url: 'https://www.bilibili.com',
        comment: 'Bilibili'
      },
      {
        id: '6',
        name: 'weibo',
        icon: 'weibo',
        favicon: 'https://www.weibo.com/favicon.ico',
        url: 'https://www.weibo.com',
        comment: '微博'
      },
      {
        id: '7',
        name: 'zhihu',
        icon: 'zhihu',
        favicon: 'https://www.zhihu.com/favicon.ico',
        url: 'https://www.zhihu.com',
        comment: '知乎'
      },
      {
        id: '8',
        name: 'wechat',
        icon: 'wechat',
        favicon: 'https://www.wechat.com/favicon.ico',
        url: 'https://web.wechat.com/?lang=zh_CN',
        comment: '微信网页版'
      },
      {
        id: '9',
        name: 'taobao',
        icon: 'taobao',
        favicon: 'https://www.taobao.com/favicon.ico',
        url: 'https://www.taobao.com',
        comment: '淘宝'
      },
      {
        id: '10',
        name: 'npm',
        icon: 'npm',
        favicon:
          'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
        url: 'https://www.npmjs.com',
        comment: 'npm'
      },
      {
        id: '11',
        name: 'juejin',
        icon: 'juejin',
        favicon: 'https://juejin.im/favicon.ico',
        url: 'https://juejin.im',
        comment: '掘金'
      },
      {
        id: '12',
        name: 'csdn',
        icon: 'csdn',
        favicon: 'https://www.csdn.net/favicon.ico',
        url: 'https://www.csdn.net',
        comment: 'CSDN'
      },
      {
        id: '13',
        name: 'gitee',
        icon: 'gitee',
        favicon: 'https://gitee.com/favicon.ico',
        url: 'https://gitee.com',
        comment: '码云Gitee'
      },
      {
        id: '14',
        name: 'stackoverflow',
        icon: 'stackoverflow',
        favicon: 'https://stackoverflow.com/favicon.ico',
        url: 'https://stackoverflow.com',
        comment: 'StackOverflow'
      },
      {
        id: '15',
        name: 'segmentfault',
        icon: 'segmentfault',
        favicon: 'https://cdn.segmentfault.com/r-7b40a4c5/favicon.ico',
        url: 'https://segmentfault.com',
        comment: 'SegmentFault'
      },
      {
        id: '16',
        name: 'jianshu',
        icon: 'jianshu',
        favicon: 'https://www.jianshu.com/favicon.ico',
        url: 'https://www.jianshu.com',
        comment: '简书'
      },
      {
        id: '17',
        name: 'qqmail',
        icon: 'qqmail',
        favicon: 'https://mail.qq.com/favicon.ico',
        url: 'https://mail.qq.com',
        comment: 'QQ邮箱'
      },
      {
        id: '18',
        name: 'greasyfork',
        icon: 'greasyfork',
        favicon:
          'https://greasyfork.org/packs/media/images/blacklogo16-5421a97c75656cecbe2befcec0778a96.png',
        url: 'https://greasyfork.org/zh-CN/scripts',
        comment: '油猴脚本'
      },
      {
        id: '19',
        name: 'stackshare',
        icon: 'stackshare',
        favicon: 'https://stackshare.io/favicon.ico',
        url: 'https://stackshare.io',
        comment: 'StackShare'
      }
    ],
    isShowToolBox: false
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
