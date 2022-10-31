import axios from 'axios'
import config from '../../config'

const api = axios.create({
  baseURL: `http://${config.IP}:${config.PORT}`
})

export default api