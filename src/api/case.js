import request from '@/utils/request'

export function fetchCasesList(data) {
  return request.get('/case/findAll', { params: data })
}

export function addCase(data) {
  return request.post('/case/addOne', data)
}

export function deleteCase(data) {
  return request.post('/case/deleteOne', null, { params: data })
}

export function updateCase(data) {
  return request.post('/case/updateOne', data)
}
