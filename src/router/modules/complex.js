/** 地图 路由 **/

import Layout from "@/layout";
/* 定义component */
const Test = () => import("@/views/demo/test");

const complexRouter = {
  path: "/complex",
  component: Layout,
  redirect: "/complex/test",
  name: "组合案例",
  meta: {
    title: "组合案例",
    icon: "skill"
  },
  children: [
    {
      path: "test",
      name: "test",
      component: Test,
      meta: { title: "第二个页面" }
    }
  ]
};

export default complexRouter;
