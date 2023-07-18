/** 地图 路由 **/

import Layout from "@/layout";
import Blank from "@/components/Blank";
/* 定义component */
const department = () => import("@/views/system/department");
const inform = () => import("@/views/system/inform");
const operation = () => import("@/views/system/log/operation");
const login = () => import("@/views/system/log/login");

const mapRouter = {
  path: "/system",
  component: Layout,
  redirect: "/system/department",
  name: "系统管理",
  meta: {
    title: "系统管理",
    icon: "system"
  },
  children: [
    {
      path: "department",
      name: "部门管理",
      component: department,
      meta: { title: "部门管理", icon: "tree" }
    },
    {
      path: "inform",
      name: "inform",
      component: inform,
      meta: { title: "通知公告", icon: "message" }
    },
    {
      path: "log",
      name: "日志管理",
      component: Blank,
      meta: { title: "日志管理", icon: "edit" },
      children: [
        {
          path: "operation",
          name: "operation",
          component: operation,
          meta: { title: "操作日志", icon: "form" }
        },
        {
          path: "login",
          name: "login",
          component: login,
          meta: { title: "登录日志", icon: "logininfor" }
        }
      ]
    }
  ]
};

export default mapRouter;
