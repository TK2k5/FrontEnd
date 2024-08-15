import axios, { AxiosInstance } from 'axios'

import { ERole } from '@/types/enums/role.enum'
import { PayloadLogin } from '@/types/auth/auth.type'
import { jwtDecode } from 'jwt-decode'
import { message } from 'antd'

class Http {
  instance: AxiosInstance

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.requestInterceptor()
    this.respondInterceptor()
  }

  requestInterceptor() {
    // Add a request interceptor
    this.instance.interceptors.request.use((config) => {
      return config
    })
  }

  respondInterceptor() {
    this.instance.interceptors.response.use((respond) => {
      const token = respond.data.accessToken
      console.log('🚀 ~ Http ~ this.instance.interceptors.response.use ~ token:', token)
      // giải mã token
      const decode = jwtDecode(token) as PayloadLogin
      if (decode.role === ERole.ADMIN) {
        return respond
      }
      message.error('Tài khoản hoặc mật khẩu không đúng')
      throw new Error('Tài khoản hoặc mật khẩu không đúng')
    })
  }
}

export const instances = (url: string) => {
  const http = new Http(url)

  return http.instance
}
