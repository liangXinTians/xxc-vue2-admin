/** 路由 **/

import Layout from '@/layout'
/* 定义component */
const Link = () => import('@/views/Two/link')
const Manage = () => import('@/views/Two/manage')
const Serve = () => import('@/views/Two/serve')

const complexRouter = {
  path: '/complex',
  component: Layout,
  redirect: '/complex/example',
  name: '系统管理',
  meta: {
    title: '系统管理'
  },
  children: [
    {
      path: 'example',
      name: 'example',
      component: Manage,
      meta: { title: '用户管理' }
    },
    {
      path: 'example2',
      name: 'example2',
      component: Link,
      meta: { title: '回收员管理' }
    },
    {
      path: 'example3',
      name: 'example3',
      component: Serve,
      meta: { title: '回收管理' }
    }
  ]
}

export default complexRouter
