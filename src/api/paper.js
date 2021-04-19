import request from '@/utils/request'

export function fetchPaperList(data) {
  return request.post('/paper/findAll')
}

export function findPaperById(data) {
  return request.post('/paper/findPaperById', data)
}

export function addPaper(data) {
  return request.post('/paper/addPaper', data)
}

export function deletePaper(data) {
  return request.post('/paper/deletePaper', data)
}

export function updatePaper(data) {
  return request.post('/paper/updatePaper', data)
}

