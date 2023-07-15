/** 常用组件 路由 **/

import Layout from "@/layout";
import Blank from "@/components/Blank";
/* 定义component */
const Test = () => import("@/views/demo/test");

const commonRouter = {
  path: "/common",
  component: Layout,
  redirect: "/common/test",
  name: "常用组件",
  meta: {
    title: "常用组件",
    icon: "job"
  },
  children: [
    {
      path: "test",
      name: "test",
      component: Test,
      meta: { title: "test页面" }
    }
  ]
};

export default commonRouter;
