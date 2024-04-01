import request from '@/utils/request'

// 查询Customer列表
export function listCustomer(query) {
  return request({
    url: '/api/v1/customer',
    method: 'get',
    params: query
  })
}

// 查询Customer详细
export function getCustomer(id) {
  return request({
    url: '/api/v1/customer/' + id,
    method: 'get'
  })
}

// 新增Customer
export function addCustomer(data) {
  return request({
    url: '/api/v1/customer',
    method: 'post',
    data: data
  })
}

// 修改Customer
export function updateCustomer(data) {
  return request({
    url: '/api/v1/customer/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Customer
export function delCustomer(data) {
  return request({
    url: '/api/v1/customer',
    method: 'delete',
    data: data
  })
}

