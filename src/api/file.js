import request from '@/utils/request'
import axios from 'axios'

export function uploadChunks(data) {
  return request.post('/bigFile/BigFileUpload', data,
    {
      headers: { 'Content-Type': 'multipart/form-data;boundary=1' }
    }
  )
}

export function fetchCatImage() {
  return axios.get('https://api.thecatapi.com/v1/images/search?limit=5&size=full&api_key=3a6bfb32-e644-4088-9627-a1634298c1ae')
}
