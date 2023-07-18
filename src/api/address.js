import request from '@/utils/request'

export function apiGetAddress(data){
	return request({
		url:'/web-api/system/address/list',
		method:'GET',
		data
	})
}
