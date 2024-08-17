import { TProduct } from '@/types/product.type'
import { TResponse } from '@/types/common.type'
import api from './base-url.api'

export const getProducts = async (token: string, query?: string): Promise<TResponse<TProduct>> => {
  const response = await api.get<TResponse<TProduct>>(`/product${query ? query : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
