import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const API_EXTENSION = process.env.VUE_APP_API_EXTENSION

export default async function fetch (path) {
  const response = await axios.get(`${API_URL}${path}${API_EXTENSION}`)
  return response.data
}
