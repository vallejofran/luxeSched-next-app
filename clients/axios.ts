const axios = require('axios')
import Config from '@/config'

const { nodeApiUrl } = Config

const AxiosClient = {
  async get(url, params) {
    try {
      const endPoint = nodeApiUrl + url
      const response = await axios.get(endPoint, { params })
      return response.data
    } catch (error) {
      throw new Error(`Error en la petición GET: ${error.message}`)
    }
  },

  async post(url, data, headers = '') {
    try {
      const endPoint = nodeApiUrl + url
      const response = await axios.post(endPoint, data, { headers })
      return response.data
    } catch (error) {
      throw new Error(`Error en la petición POST: ${error.message}`)
    }
  },

  async put(url, params, data) {
    try {
      const endPoint = nodeApiUrl + url
      const response = await axios.put(endPoint + params, { data })
      return response.data
    } catch (error) {
      throw new Error(`Error en la petición PUT: ${error.message}`)
    }
  },

  async delete(url, params) {
    try {
      const endPoint = nodeApiUrl + url
      const response = await axios.delete(endPoint + params)
      return response.data
    } catch (error) {
      throw new Error(`Error en la petición DELETE: ${error.message}`)
    }
  },
}

export default AxiosClient
