/*
 * @Author: JeremyJone
 * @Date: 2021-10-12 16:00:00
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-11 15:50:43
 * @Description: 路由配置文件
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import { initConfig } from '@/config/init';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 匹配全部其他内容
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "404" */ '@/pages/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由拦截器
router.beforeEach((to, from, next) => {
  // 初始化配置
  initConfig();

  next();
});

export default router;
