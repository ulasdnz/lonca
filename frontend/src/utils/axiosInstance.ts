import { store } from '../redux/store'
import axios from 'axios'
import config from '../../config'

const axiosInstance = axios.create({
  baseURL: config.serverIp,
})

const setAuthHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers['Authorization']
  }
}

store.subscribe(() => {
  const token = store.getState().login.user.token
  setAuthHeader(token)
})

setAuthHeader(store.getState().login.user.token)

export default axiosInstance
