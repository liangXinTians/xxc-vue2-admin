import Vue from "vue"
import Router from "vue-router"

/**
 * 静态模块路由
 */
import commonRouter from "./modules/common" // xx路由
import homeRouter from "./modules/home" // xx路由
import complexRouter from "./modules/complex" // xx路由
import shortRouter from "./modules/short"

Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true
  },
  homeRouter,
  complexRouter,
  commonRouter,
  shortRouter
]

const router = new Router({
  base: "/xxc-vue2/",
  routes: constantRoutes,
  mode: "hash"
})
export default router
