import request from '@/utils/request'

// 获取路由
export const getHouseRoomList = (data) => {
  return request({
    url: '/web-api/system/houseRoom/list',
    method: 'get',
    params: data
  })
}