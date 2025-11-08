import { create } from 'zustand'
import { cartApi } from '../services/cartService'

export const useCartStore = create((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,
  
  // Fetch cart from backend
  fetchCart: async () => {
    try {
      set({ isLoading: true })
      const response = await cartApi.getCart()
      set({ cart: response.cart, isLoading: false })
    } catch (error) {
      console.error('Error fetching cart:', error)
      set({ cart: null, isLoading: false })
    }
  },
  
  // Add item to cart (backend)
  addItem: async (productId) => {
    try {
      set({ isLoading: true })
      const response = await cartApi.addToCart(productId)
      set({ cart: response.cart?.products || null, isLoading: false })
      return response
    } catch (error) {
      console.error('Error adding to cart:', error)
      set({ isLoading: false })
      throw error
    }
  },
  
  // Remove item from cart (backend)
  removeItem: async (productId) => {
    try {
      set({ isLoading: true })
      const response = await cartApi.removeFromCart(productId)
      set({ cart: response.cart?.products || null, isLoading: false })
      return response
    } catch (error) {
      console.error('Error removing from cart:', error)
      set({ isLoading: false })
      throw error
    }
  },
  
  // Clear cart
  clearCart: () => set({ cart: null }),
  
  // Toggle cart drawer
  toggleCart: () => set({ isOpen: !get().isOpen }),
  
  // Open cart drawer
  openCart: () => set({ isOpen: true }),
  
  // Close cart drawer
  closeCart: () => set({ isOpen: false }),
  
  // Get total price
  getTotal: () => {
    const cart = get().cart
    if (!cart || !Array.isArray(cart)) return 0
    return cart.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 0)
    }, 0)
  },
  
  // Get item count
  getItemCount: () => {
    const cart = get().cart
    if (!cart || !Array.isArray(cart)) return 0
    return cart.reduce((count, item) => count + (item.quantity || 0), 0)
  },
}))
