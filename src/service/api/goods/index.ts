/**
 * goods模块接口列表
 */

// 引入 axios 封装实例
import request from '@/service/request'

// 添加商品接口
export function addGoods (formData:object,file:any){
    const data = new FormData()
    data.append('file',file.raw)
    data.append('formData',JSON.stringify(formData))
    return request({
        url: '/add-pendingGoods',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
}

// 查询接口
export function goodsSearch(data:object){
    return request({
        url: '/search-goods',
        method: 'POST',
        data
    })
}

// 更新状态接口
export function goodsUpdateStateBySid(data:object){
    return request({
        url: '/update-goods-state',
        method: 'POST',
        data
    })
}

// 删除接口
export function goodsDeleteBySid(data:object){
    return request({
        url: '/delete-goods',
        method: 'POST',
        data
    })
}