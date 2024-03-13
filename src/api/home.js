import request from '@/utils/request'

export function apiGetFlow (data) {
  return request({
    url: '/getHome',
    method: 'GET',
    data
  })
}

export function apiGetLine (data) {
  return request({
    url: '/web-api/api/echarts/flowLine',
    method: 'GET',
    data
  })
}
