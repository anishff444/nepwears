import { motion } from 'framer-motion'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orderApi } from '../services/orderService'
import Loader from '../components/Loader'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    } else {
      setLoading(false)
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await orderApi.checkPaymentStatus(orderId)
      setOrder(response.data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-3xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-dark-600 dark:text-dark-400 mb-6"
          >
            Your order has been placed successfully
          </motion.p>

          {/* Order Details */}
          {order && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-4 mb-6 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-primary-500" />
                <div>
                  <p className="text-sm text-dark-500 dark:text-dark-400">Order ID</p>
                  <p className="font-mono text-sm font-semibold">{order._id}</p>
                </div>
              </div>
              <div className="border-t border-dark-200 dark:border-dark-700 pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-dark-600 dark:text-dark-400">Total Amount</span>
                  <span className="font-bold">Rs. {order.totalAmount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-600 dark:text-dark-400">Status</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/orders')}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              View My Orders
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/products')}
              className="btn-secondary w-full"
            >
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
