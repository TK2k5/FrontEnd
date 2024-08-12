export type TBodyLogin = {
  email: string
  password: string
}

export type TResponseLogin = {
  message: string
  success: boolean
  accessToken: string
}
