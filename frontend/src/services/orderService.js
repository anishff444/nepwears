import api from '../lib/api'

export const orderService = {
  createOrder: async (data) => {
    const response = await api.post('/orders/checkout', data)
    // Backend returns { success, message, data: { order, paymentData, esewaPaymentUrl } }
    // We return the data object which contains paymentData
    return response.data.data
  },

  verifyPayment: async (params) => {
    const response = await api.get('/orders/verify-payment', { params })
    return response.data
  },

  getOrderHistory: async () => {
    const response = await api.get('/orders/history')
    return response.data
  },

  getOrderStatus: async (orderId) => {
    const response = await api.get(`/orders/status/${orderId}`)
    return response.data
  },

  checkPaymentStatus: async (orderId) => {
    const response = await api.get(`/orders/status/${orderId}`)
    return response.data
  },
}

// Also export as orderApi for backward compatibility
export const orderApi = orderService
