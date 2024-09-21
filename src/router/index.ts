import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Root',
            component: () => import('@/views/Root/index.vue'),
            redirect : '/login',
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import('@/views/Root/Home.vue'),
                    meta: {
                        title: '首页',
                        affix: true
                    }
                },
                {
                    path: '/goods',
                    name: 'Goods',
                    children: [
                        {
                            path: '/goods/goodsAdd',
                            name: 'GoodsList',
                            component: () => import('@/views/Root/Goods/GoodsAdd.vue'),
                            meta: {
                                title: '商品上架'
                            }
                        },
                        {
                            path: '/goods/goodsManage',
                            name: 'GoodsExamine',
                            component: () => import('@/views/Root/Goods/GoodsManage.vue'),
                            meta: {
                                title: '商品管理'
                            }
                        }
                    ]
                },
                {
                    path: '/order',
                    name: 'Order',
                    children: [
                        {
                            path: '/order/orderList',
                            name: 'OrderList',
                            component: () => import('@/views/Root/Order/OrderList.vue'),
                            meta: {
                                title: '订单列表'
                            }
                        }
                    ]
                },
                {
                    path: '/user',
                    name: 'User',
                    component: () => import('@/views/Root/User/index.vue'),
                    meta: {
                        title: '个人管理'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login/index.vue'),
        }
    ]
})

export default router;