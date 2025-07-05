import axios from "axios"

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${import.meta.env.AUTH_URL}/v1/auth/signup`, { email, password })
  return response.data
}

export const logout = async () => {
  const response = await axios.post('/api/auth/logout')
  return response.data
}