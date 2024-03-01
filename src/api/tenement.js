import request from '@/utils/request'

// 获取房源管理信息
export const getHouseRoomList = (data) => {
  return request({
    url: '/web-api/system/houseRoom/list',
    method: 'get',
    params: data
  })
}

// 获取小区管理信息
export const getHouseVillageList = (data) => {
  return request({
    url: '/web-api/system/houseVillage/list',
    method: 'get',
    params: data
  })
}