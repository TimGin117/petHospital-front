import request from '@/utils/request'

export function login(data) {
  return request.post('/oauth/admin/login/normal', data)
}

export function userInfo(data) {
  return request.get('/usr/info/loadByStuId', { params: data })
}

export function register(data) {
  return request.post('/oauth/register/adm', data)
}

export function thirdLogin(data) {
  return request.get('/oauth/login/google', { params: data })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function loadAllUsr() {
  return request.get('/usr/info/loadAllUsr')
}

export function change2Adm(data) {
  return request.get('/usr/info/change2Adm', { params: data })
}

export function change2Normal(data) {
  return request.get('/usr/info/change2Normal', { params: data })
}

export function change2Forbid(data) {
  return request.get('/usr/info/change2Forbid', { params: data })
}
