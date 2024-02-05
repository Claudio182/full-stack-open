import axios from '../axiosConfig'
const baseUrl = '/api/blogs'
import helper from './helper'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const token = helper.getToken()

  const config = {
    headers: {
      authorization: `bearer ${token}`
    }
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const remove = async (id) => {
  const token = helper.getToken()

  const config = {
    headers: {
      authorization: `bearer ${token}`
    }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const giveLike = async (blogUpdate) => {
  //const token = helper.getToken()

  const request = await axios.put( `${baseUrl}/${blogUpdate.id}`, blogUpdate )
  return request.data
}
export default { getAll, create, giveLike, remove }