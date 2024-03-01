/** 地图 路由 **/

import Layout from '@/layout'

/* 定义component */
const order1 = () => import('@/views/order/order1')
const order2 = () => import('@/views/order/order2')


const mapRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/order1',
  name: '奖品管理',
  meta: {
    title: '奖品管理',
    icon: 'system'
  },
  children: [
    {
      path: 'order1',
      name: '物品总览',
      component: order1,
      meta: { title: '物品总览', icon: 'tree' }
    },
    {
      path: 'inform',
      name: '个人兑换数据',
      component: order2,
      meta: { title: '回收统计', icon: 'form' }
    },
  ]
}

export default mapRouter
