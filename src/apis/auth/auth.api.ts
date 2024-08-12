import { TBodyLogin, TResponseLogin } from '@/types/auth/auth.type'

import { instances } from '@/configs/instances'

const api = instances(`${import.meta.env.VITE_API_URL}`)

export const login = async (body: TBodyLogin): Promise<TResponseLogin> => {
  const response = await api.post('/login', body)
  return response.data
}
