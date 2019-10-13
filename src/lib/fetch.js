import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

export default async function fetch (path) {
  const response = await axios.get(`${API_URL}${path}`)
  return response.data
}