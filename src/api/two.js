import request from '@/utils/request'

// 获取列表信息
export function getApiList() {
    return request({
      url: '/web-api/system/article/list',
      method: 'GET',
    //   data
    })
  }
// 获取文章类型
export function getAriticleTyoe() {
  return request({
    url: '/web-api/system/dict/data/type/sys_article_type',
    method: 'GET',
  //   data
  })
}

// 获取友情链接列表信息
export function getLinkList() {
  return request({
    url: '/web-api/system/link/list',
    method: 'GET',
  //   data
  })
}

// 获取服务条目列表信息
export function getServeList() {
  return request({
    url: '/web-api/system/item/list',
    method: 'GET',
  //   data
  })
}
