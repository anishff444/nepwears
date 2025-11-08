import api from '../lib/api'

export const authApi = {
  signup: async (data) => {
    const response = await api.post('/users/signup', data)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials)
    return response.data
  },

  getMe: async () => {
    const response = await api.get('/users/me')
    return response.data
  },

  updateMe: async (data) => {
    const response = await api.patch('/users/updateMe', data)
    return response.data
  },

  updatePassword: async (data) => {
    const response = await api.patch('/users/updateMyPassword', data)
    return response.data
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/deleteMe')
    return response.data
  },
}
