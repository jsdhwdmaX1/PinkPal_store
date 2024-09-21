/**
 * order模块接口列表
 */

// 引入 axios 封装实例
import request from '@/service/request'

export function orderSearch(data:String){
    return request({
        url: '/search-order-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}