import axios, { AxiosInstance } from 'axios'

import { jwtDecode } from 'jwt-decode'

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
    this.responseInterceptor()
  }

  requestInterceptor() {
    this.instance.interceptors.request.use((config) => {
      const BearerToken = config.headers.Authorization
      const token = BearerToken ? (BearerToken as string).split(' ')[1] : null

      const date = new Date()
      if (token) {
        const decodeToken = jwtDecode(token)
        if (decodeToken && decodeToken.exp! < date.getTime() / 1000) {
          console.log('object')
        }
      }
      return config
    })
  }

  responseInterceptor() {
    this.instance.interceptors.response.use(
      async (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

export const instances = (url: string) => {
  const http = new Http(url)

  return http.instance
}
