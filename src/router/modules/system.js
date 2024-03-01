/** 地图 路由 **/

import Layout from '@/layout'
/* 定义component */
const department = () => import('@/views/system/department')
const inform = () => import('@/views/system/inform')
const operation = () => import('@/views/system/operation')


const mapRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/department',
  name: '数据统计',
  meta: {
    title: '数据统计',
    icon: 'system'
  },
  children: [
    {
      path: 'department',
      name: '数据总览',
      component: department,
      meta: { title: '数据总览', icon: 'tree' }
    },
    {
      path: 'inform',
      name: '回收统计',
      component: inform,
      meta: { title: '回收统计', icon: 'form' }
    },
    {
      path: 'operation',
      name: '历史数据',
      component: operation,
      meta: { title: '历史数据', icon: 'message' }
    },

  ]
}

export default mapRouter
