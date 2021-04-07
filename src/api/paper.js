import request from '@/utils/request'

export function fetchPaperList(data) {
  return request.post('/paper/findAll')
}

export function addPaper(data) {
  return request.post('/paper/addPaper', data)
}

