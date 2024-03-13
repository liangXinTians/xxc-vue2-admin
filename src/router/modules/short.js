/** 地图 路由 **/
import Layout from '@/layout'
import Blank from "@/components/Blank"
/* 定义component */
const goods = () => import('@/views/short/goods/goods.vue')
const category = () => import('@/views/short/goods/category.vue')
const orders = () => import('@/views/short/orders/orders.vue')
const shortRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goods.vue',
  name: '订单管理',
  meta: {
    title: '订单管理',
    icon: 'skill'
  },
  children: [
    {
      path: 'goods',
      name: '商品管理',
      component: Blank,
      meta: { title: '商品管理', icon: 'skill' },
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: goods,
          meta: { title: '商品管理', icon: 'skill' }
        },
        {
          path: 'category',
          name: 'category',
          component: category,
          meta: { title: '分类管理', icon: 'skill' }
        }
      ]
    },
    {
      path: 'orders',
      name: 'orders',
      component: orders,
      meta: { title: '发布订阅', icon: 'skill' }
    },

  ]
}
export default shortRouter
