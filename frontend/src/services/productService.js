import api from '../lib/api'

export const productApi = {
  getAllProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  createProduct: async (data) => {
    const response = await api.post('/products/createProduct', data)
    return response.data
  },

  updateProduct: async (id, data) => {
    const response = await api.patch(`/products/updateProductDetail/${id}`, data)
    return response.data
  },
}
