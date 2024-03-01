import Vue from 'vue'
import Router from 'vue-router'

/**
 * 静态模块路由
 */

import homeRouter from './modules/home' // 首页路由
import complexRouter from './modules/complex' // 系统管理
import houseRouter from './modules/tenement' // 用户反馈
import shortRouter from './modules/short' // 回收商城
import system from './modules/system' // 数据统计
import order from './modules/order' // 数据统计

Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  homeRouter,
  complexRouter,
  order,
  shortRouter,
  houseRouter,
  system
]

const router = new Router({
  base: '/vue/',
  routes: constantRoutes,
  mode: 'hash'
})
export default router
