/** 地图 路由 **/
import Layout from "@/layout"
import Blank from "@/components/Blank"
/* 定义component */
const goods = () => import("@/views/short/goods/goods.vue")
const category = () => import("@/views/short/goods/category.vue")
const orders = () => import("@/views/short/orders/orders.vue")
const advertisement = () => import("@/views/short/advertisement/advertisement.vue")
const navigation = () => import("@/views/short/advertisement/navigation.vue")
// const address = () => import("@/views/short/address/address.vue")
const shortRouter = {
  path: "/goods",
  component: Layout,
  redirect: "/goods/goods.vue",
  name: "私域商城",
  meta: {
    title: "私域商城",
    icon: "skill"
  },
  children: [
    {
      path: "goods",
      name: "商品管理",
      component: Blank,
      meta: { title: "商品管理", icon: "skill" },
      children: [
        {
          path: "goods",
          name: "goods",
          component: goods,
          meta: { title: "商品管理", icon: "skill" }
        },
        {
          path: "category",
          name: category,
          component: category,
          meta: { title: "分类管理", icon: "skill" }
        }
      ]
    },
    {
      path: "orders",
      name: "orders",
      component: orders,
      meta: { title: "订单信息", icon: "skill" }
    },
    {
      path: "advertisement",
      name: "广告管理",
      component: Blank,
      meta: { title: "广告管理", icon: "skill" },
      children: [
        {
          path: "advertisement",
          name: "advertisement",
          component: advertisement,
          meta: { title: "广告管理", icon: "skill" }
        },
        {
          path: "navigation",
          name: "navigation",
          component: navigation,
          meta: { title: "导航管理", icon: "skill" }
        }
      ]
    },
    {
      path: "address",
      name: "地址管理",
      component: Blank,
      meta: { title: "地址管理", icon: "skill" },
      children: [
        {
          path: "address",
          name: "address",
          component: address,
          meta: { title: "收货地址", icon: "skill" }
        }
      ]
    }
  ]
}
export default shortRouter