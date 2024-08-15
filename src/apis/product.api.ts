import api from './base-url.api'

export const getProducts = async (token: string) => {
  const response = await api.get('/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
