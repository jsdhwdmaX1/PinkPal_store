/**
 * category 模块接口列表
 */

// 引入 axios 封装实例
import request from '@/service/request'

// 登录接口
export function getCategory (){
    return request({
        url: '/get-category-two',
        method: 'post',
    })
}