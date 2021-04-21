import request from '@/utils/request'
import _ from 'lodash'

export const fetchQuestionList = () => request.post('/question/findAll')

export const memoFetchQuestionList = _.memoize(() => request.post('/question/findAll'))

export function addQuestion(data) {
  return request.post('/question/addQuestion', data)
}

export function deleteQuestion(data) {
  return request.post('/question/deleteQuestion', data)
}
