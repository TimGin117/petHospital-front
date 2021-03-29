import request from '@/utils/request'

export function fetchDiseasesList() {
  return request.get('/disease/findAll')
}

export function addDiseases(data) {
  return request.post('/disease/addOne', data)
}

export function deleteDiseases(data) {
  return request.post('/disease/deleteOne', data)
}
