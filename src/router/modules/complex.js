/** 路由 **/

import Layout from "@/layout";
/* 定义component */
const Example = () => import("@/views/demo/test");

const complexRouter = {
  path: "/complex",
  component: Layout,
  redirect: "/complex/example",
  name: "组合案例",
  meta: {
    title: "组合案例",
    icon: "skill"
  },
  children: [
    {
      path: "example",
      name: "example",
      component: Example,
      meta: { title: "第1个页面" }
    },
    {
      path: "example2",
      name: "example2",
      component: Example,
      meta: { title: "第二个页面" }
    }
  ]
};

export default complexRouter;
