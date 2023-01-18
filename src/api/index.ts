import axios from 'axios'

export const API_URL = 'https://dog.ceo/api'

const api = axios.create({
  baseURL: API_URL,
})

export default api
