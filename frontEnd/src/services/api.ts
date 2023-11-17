import axios from 'axios'
const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP}:${process.env.EXPO_PUBLIC_PORT}`
})

export default api