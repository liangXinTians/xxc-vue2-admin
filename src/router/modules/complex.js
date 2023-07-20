/** 路由 **/

import Layout from "@/layout";
/* 定义component */
// const Example = () => import("@/views/demo/test");
const Link = () => import("@/views/Two/link");
const Manage = () => import("@/views/Two/manage");
const Serve = () => import("@/views/Two/serve");
const Example = () => import("@/views/demo/test");

const complexRouter = {
  path: "/complex",
  component: Layout,
  redirect: "/complex/example",
  name: "内容管理",
  meta: {
    title: "内容管理"
  },
  children: [
    {
      path: "example",
      name: "example",
      component: Manage,
      meta: { title: "文章管理" }
    },
    {
      path: "example2",
      name: "example2",
      component: Link,
      meta: { title: "友情链接" }
    },
    {
      path: "example3",
      name: "example3",
      component: Serve,
      meta: { title: "服务条目" }
    }
  ]
};

export default complexRouter;
