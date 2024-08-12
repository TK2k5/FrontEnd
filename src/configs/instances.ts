import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const instances = (url: string) => {
  const http = new Http(url)

  return http.instance
}
