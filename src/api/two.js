import request from '@/utils/request'

// 获取列表信息
export function getApiList(data) {
    return request({
      url: '/web-api/system/article/list',
      method: 'GET',
      params:data
    })
  }
// 获取文章类型
export function getAriticleTyoe(data) {
  return request({
    url: '/web-api/system/dict/data/type/sys_article_type',
    method: 'GET',
    params:data
  })
}

// 获取友情链接列表信息
export function getLinkList(data) {
  return request({
    url: '/web-api/system/link/list',
    method: 'GET',
    params:data
  })
}

// 获取服务条目列表信息
export function getServeList(data) {
  return request({
    url: '/web-api/system/item/list',
    method: 'GET',
    params:data
  })
}


// 获取服务条目类别信息
export function getServeType(data) {
  return request({
    url: '/web-api/system/dict/data/type/sys_service_type',
    method: 'GET',
    params:data
  })
}