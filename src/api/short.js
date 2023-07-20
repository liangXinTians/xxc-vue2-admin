import request from '@/utils/request'
//商品管理列表
export function getShortList (data) {
  return request({
    url: '/web-api/system/goods/list',
    method: 'GET',
    data
  })
}
//导航管理列表
export function getNavigateList (data) {
  return request({
    url: '/web-api/system/navigate/list',
    method: 'GET',
    data
  })
}
//广告管理列表
export function getAdvertiseList (data) {
  return request({
    url: '/web-api/system/advert/list',
    method: 'GET',
    data
  })
}
// 订单信息
export function getOrderList (data) {
  return request({
    url: '/web-api/system/order/list',
    method: 'GET',
    data
  })
}
//地址管理
export function apiGetAddress (data) {
  return request({
    url: '/web-api/system/address/list',
    method: 'GET',
    data
  })
}

//广告管理类别
export function getAdvertType (data) {
  return request({
    url: '/web-api/system/dict/data/type/mall_advert_type',
    method: 'GET',
    data
  })
}