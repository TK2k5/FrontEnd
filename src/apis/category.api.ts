import { TCategory, TFormCategory } from '@/types/category.type'
import { TResponseDetail, TResponseNoPagination } from '@/types/common.type'

import api from './base-url.api'

export const getCategories = async (token: string, query?: string): Promise<TResponseNoPagination<TCategory>> => {
  const response = await api.get<TResponseNoPagination<TCategory>>(`/categories${query ? query : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const createCategory = async (body: TFormCategory, token: string): Promise<TResponseDetail<TCategory>> => {
  const response = await api.post<TResponseDetail<TCategory>>(`/category`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
