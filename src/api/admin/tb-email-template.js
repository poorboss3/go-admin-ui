import request from '@/utils/request'

// 查询EmailTemplate列表
export function listEmailTemplate(query) {
  return request({
    url: '/api/v1/email-template',
    method: 'get',
    params: query
  })
}

// 查询EmailTemplate详细
export function getEmailTemplate(id) {
  return request({
    url: '/api/v1/email-template/' + id,
    method: 'get'
  })
}

// 新增EmailTemplate
export function addEmailTemplate(data) {
  return request({
    url: '/api/v1/email-template',
    method: 'post',
    data: data
  })
}

// 修改EmailTemplate
export function updateEmailTemplate(data) {
  return request({
    url: '/api/v1/email-template/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除EmailTemplate
export function delEmailTemplate(data) {
  return request({
    url: '/api/v1/email-template',
    method: 'delete',
    data: data
  })
}

