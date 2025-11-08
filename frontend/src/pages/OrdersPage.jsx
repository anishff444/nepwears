import { motion } from 'framer-motion'
import { Package, Calendar, CreditCard, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { orderApi } from '../services/orderService'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

export default function OrdersPage() {
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getOrderHistory,
  })

  const orders = data?.data || []

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-dark-600 dark:text-dark-400 bg-dark-100 dark:bg-dark-800'
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error.response?.data?.message || 'Failed to load orders'}
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            My <span className="gradient-text">Orders</span>
          </motion.h1>
          <p className="text-dark-600 dark:text-dark-400 text-lg">
            Track and manage your orders
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <Package className="w-20 h-20 text-dark-300 dark:text-dark-700 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
            <p className="text-dark-600 dark:text-dark-400 mb-6">
              Start shopping to see your orders here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-dark-500 dark:text-dark-400">Order ID</p>
                        <p className="font-mono text-sm font-semibold">{order._id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-dark-400" />
                        <div>
                          <p className="text-xs text-dark-500 dark:text-dark-400">Date</p>
                          <p className="text-sm font-medium">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-dark-400" />
                        <div>
                          <p className="text-xs text-dark-500 dark:text-dark-400">Amount</p>
                          <p className="text-sm font-medium">Rs. {order.totalAmount?.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-xs text-dark-500 dark:text-dark-400">Status</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products Summary */}
                    <div className="flex flex-wrap gap-2">
                      {order.products?.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="glass rounded-lg px-3 py-1.5 text-sm flex items-center gap-2"
                        >
                          {item.productId?.imageUrl && (
                            <img
                              src={item.productId.imageUrl}
                              alt={item.productId?.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <span className="font-medium">{item.productId?.name}</span>
                          <span className="text-dark-500">×{item.quantity}</span>
                        </div>
                      ))}
                      {order.products?.length > 3 && (
                        <div className="glass rounded-lg px-3 py-1.5 text-sm text-dark-500">
                          +{order.products.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary inline-flex items-center gap-2 lg:self-center"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
