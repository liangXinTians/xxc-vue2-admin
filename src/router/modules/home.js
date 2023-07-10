/** 地图 路由 **/

import Layout from "@/layout";
/* 定义component */
const home = () => import("@/views/demo/home");
const test = () => import("@/views/demo/test");

const mapRouter = {
  path: "/",
  component: Layout,
  redirect: "/home",
  name: "工作台",
  meta: {
    title: "工作台",
    icon: "dict"
  },
  children: [
    {
      path: "home",
      name: "首页",
      component: home,
      meta: { title: "首页" }
    },
    {
      path: "test",
      name: "test",
      component: test,
      meta: { title: "test页面" }
    }
  ]
};

export default mapRouter;
