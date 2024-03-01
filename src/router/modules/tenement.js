/** 路由 **/

import Layout from "@/layout";
/* 定义component */
const house = () => import("@/views/tenement/house");
const housingEstate = () => import("@/views/tenement/housingEstate");

const houseRouter = {
    path: "/tenement",
    component: Layout,
    redirect: "/tenement/house",
    name: "便民租房",
    meta: {
        title: "便民租房",
        icon: "github"
    },
    children: [
        {
            path: "house",
            name: "house",
            component: house,
            meta: {
                title: "房源管理",
                icon: "github"
            }
        },
        {
            path: "housingEstate",
            name: "housingEstate",
            component: housingEstate,
            meta: { 
                title: "小区管理", 
                icon: "github" 
            }
        }
    ]
};

export default houseRouter;
