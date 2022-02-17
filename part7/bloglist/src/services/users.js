import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.post(baseUrl)
  return response.data
}

export default { getAll }
