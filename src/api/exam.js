import request from '@/utils/request'

export function addExam(data) {
  return request.post('/exam/addExam', data)
}

