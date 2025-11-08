import api from '../lib/api'

export const cartApi = {
  getCart: async () => {
    const response = await api.get('/carts')
    return response.data
  },

  addToCart: async (productId) => {
    const response = await api.post(`/carts/add/${productId}`)
    return response.data
  },

  removeFromCart: async (productId) => {
    const response = await api.post(`/carts/remove/${productId}`)
    return response.data
  },
}
