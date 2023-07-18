/** 地图 路由 **/

import Layout from "@/layout";
/* 定义component */
const home = () => import("@/views/demo/home");
const test = () => import("@/views/demo/test");

const mapRouter = {
  path: "/",
  component: Layout,
  redirect: "/home",
  name: "首页",
  meta: {
    title: "首页",
    icon: "dict"
  },
  children: [
    {
      path: "home",
      name: "首页",
      component: home,
      meta: { title: "首页" }
    }
  ]
};

export default mapRouter;
