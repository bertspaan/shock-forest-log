import axios from 'axios'

const API_URL = 'https://shock-forest-bot.herokuapp.com'

export default async function fetch (path) {
  const response = await axios.get(`${API_URL}${path}`)
  return response.data
}