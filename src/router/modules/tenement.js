/** 路由 **/

import Layout from '@/layout'
/* 定义component */
const house = () => import('@/views/tenement/house')
const housingEstate = () => import('@/views/tenement/housingEstate')

const houseRouter = {
    path: '/tenement',
    component: Layout,
    redirect: '/tenement/house',
    name: '用户反馈',
    meta: {
        title: '用户反馈',
        icon: 'github'
    },
    children: [
        {
            path: 'house',
            name: 'house',
            component: house,
            meta: {
                title: '回收员反馈数据',
                icon: 'github'
            }
        },
        {
            path: 'housingEstate',
            name: 'housingEstate',
            component: housingEstate,
            meta: {
                title: '用户反馈数据',
                icon: 'github'
            }
        }
    ]
}

export default houseRouter
