import request from '@/utils/request'

export function uploadChunks(data) {
  return request.post('/bigFile/BigFileUpload', data,
    {
      headers: { 'Content-Type': 'multipart/form-data;boundary=1' }
    }
  )
}
