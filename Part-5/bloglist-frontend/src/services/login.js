import axios from '../axiosConfig'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const request = await axios.post(baseUrl, credentials)
  return request.data
}

export default { login }