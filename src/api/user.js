import request from '@/utils/request'

export function login(data) {
  return request.post('/oauth/login/normal', data)
}

export function userInfo(data) {
  return request.get('/usr/info/loadByStuId', { params: data })
}

export function register(data) {
  return request.post('/oauth/register/all', data)
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
