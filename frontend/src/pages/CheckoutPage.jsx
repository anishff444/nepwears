import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, CreditCard, Package } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { orderService } from '../services/orderService'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, isLoading: cartLoading } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!cartLoading && (!cart || cart.length === 0)) {
      toast.error('Your cart is empty')
      navigate('/products')
    }
  }, [cart, cartLoading, navigate])

  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0
    return cart.reduce((total, item) => {
      return total + (item.productId?.price || 0) * item.quantity
    }, 0)
  }

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      const response = await orderService.createOrder()

      if (response.paymentData && response.esewaPaymentUrl) {
        const { paymentData, esewaPaymentUrl } = response

        // Create form and submit to eSewa
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = esewaPaymentUrl

        Object.keys(paymentData).forEach((key) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = paymentData[key]
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Failed to process checkout')
      setIsProcessing(false)
    }
  }

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nepal-50/50">
        <div className="text-lg text-nepal-600">Loading checkout...</div>
      </div>
    )
  }

  const total = calculateTotal()

  return (
    <div className="min-h-screen bg-nepal-50/50 py-8 md:py-12">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-nepal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-terracotta-600" />
          </div>
          <h1 className="heading-2 mb-2">Checkout</h1>
          <p className="text-nepal-600">Review your order and proceed to payment</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-nepal-200 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-nepal-100 to-terracotta-50 p-6 border-b border-nepal-200">
            <h2 className="font-display text-xl font-semibold text-nepal-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order Summary
            </h2>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {cart?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-nepal-50 rounded-lg"
                >
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.productId?.imageUrl || '/placeholder.jpg'}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-nepal-900 mb-1">
                      {item.productId?.name}
                    </h3>
                    <p className="text-sm text-nepal-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-nepal-900">
                      NPR {((item.productId?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="divider my-6" />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-nepal-700">
                <span>Subtotal</span>
                <span className="font-medium">NPR {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-nepal-700">
                <span>Shipping</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="divider my-3" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-display font-semibold text-nepal-900">
                  Total
                </span>
                <span className="text-2xl font-display font-bold text-terracotta-600">
                  NPR {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="bg-white rounded-2xl shadow-sm border border-nepal-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-terracotta-600" />
            <h3 className="font-display text-lg font-semibold text-nepal-900">
              Payment Method
            </h3>
          </div>
          
          <p className="text-nepal-600 text-sm mb-6">
            You will be redirected to eSewa to complete your payment securely.
          </p>

          <button
            onClick={handleCheckout}
            disabled={isProcessing || !cart || cart.length === 0}
            className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Proceed to eSewa Payment'}
          </button>
        </div>

        {/* Security Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 1.9c1.1 0 2.2.2 3.2.6.8.3 1.5 1 1.8 1.8.5 1.1.7 2.2.7 3.4v.6c0 1.2-.2 2.3-.7 3.4-.3.8-1 1.5-1.8 1.8-1 .4-2.1.6-3.2.6s-2.2-.2-3.2-.6c-.8-.3-1.5-1-1.8-1.8-.5-1.1-.7-2.2-.7-3.4v-.6c0-1.2.2-2.3.7-3.4.3-.8 1-1.5 1.8-1.8 1-.4 2.1-.6 3.2-.6zm0 1.8c-.9 0-1.7.2-2.5.5-.5.2-1 .6-1.2 1.2-.4.9-.5 1.8-.5 2.7v.6c0 .9.1 1.8.5 2.7.2.5.7.9 1.2 1.2.8.3 1.6.5 2.5.5s1.7-.2 2.5-.5c.5-.2 1-.6 1.2-1.2.4-.9.5-1.8.5-2.7v-.6c0-.9-.1-1.8-.5-2.7-.2-.5-.7-.9-1.2-1.2-.8-.3-1.6-.5-2.5-.5zm0 4.5c.4 0 .8.3.8.8v2.2c0 .4-.4.8-.8.8s-.8-.4-.8-.8V9c0-.5.4-.8.8-.8zm0-2.2c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Secure Payment</span>
          </div>
          <p className="text-sm text-green-600">
            Your payment information is protected with industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  )
}
