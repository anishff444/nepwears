import { useQuery } from '@tanstack/react-query'
import { Package, Calendar, CreditCard, ChevronRight } from 'lucide-react'
import { orderService } from '../services/orderService'
import { PageLoader } from '../components/Loader'

export default function OrdersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrderHistory(),
  })

  const orders = data || []
  console.log(data)

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen bg-nepal-50/50 py-8 md:py-12">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-terracotta-100 to-nepal-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-terracotta-600" />
            </div>
            <div>
              <h1 className="heading-2">My Orders</h1>
              <p className="text-nepal-600 text-sm">Track and manage your orders</p>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">Failed to load orders</p>
            <p className="text-red-500 text-sm mt-1">Please try again later</p>
          </div>
        )}

        {/* Empty State */}
        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-nepal-200 p-12 text-center">
            <div className="w-20 h-20 bg-nepal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-nepal-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-nepal-900 mb-2">
              No orders yet
            </h3>
            <p className="text-nepal-600 mb-6">
              Start shopping to see your orders here
            </p>
            <a href="/products" className="btn btn-primary">
              Browse Products
            </a>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl border border-nepal-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-nepal-50 to-terracotta-50 p-4 md:p-6 border-b border-nepal-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-mono text-sm text-nepal-600">
                          Order #{order._id?.slice(-8)}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-nepal-500 mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                      {/* Order Status */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-nepal-100 text-nepal-800'
                        }`}
                      >
                        📦 {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                      
                      {/* Payment Status */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.paymentStatus === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        💳 {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-3 mb-4">
                    {order.products?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-nepal-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.productId?.imageUrl || '/placeholder.jpg'}
                            alt={item.productId?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-nepal-900 truncate">
                            {item.productId?.name}
                          </p>
                          <p className="text-xs text-nepal-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-nepal-900">
                          NPR {((item.productId?.price || 0) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {order.products?.length > 3 && (
                      <p className="text-sm text-nepal-500 text-center">
                        +{order.products.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-4 border-t border-nepal-200 space-y-3">
                    {/* Status Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {/* Order Status Detail */}
                      <div className="bg-nepal-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-4 h-4 text-nepal-600" />
                          <span className="text-xs font-medium text-nepal-600">Order Status</span>
                        </div>
                        <p className={`text-sm font-semibold ${
                          order.status === 'delivered'
                            ? 'text-green-700'
                            : order.status === 'shipped'
                            ? 'text-blue-700'
                            : order.status === 'pending'
                            ? 'text-amber-700'
                            : 'text-nepal-700'
                        }`}>
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </p>
                      </div>
                      
                      {/* Payment Status Detail */}
                      <div className="bg-nepal-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="w-4 h-4 text-nepal-600" />
                          <span className="text-xs font-medium text-nepal-600">Payment Status</span>
                        </div>
                        <p className={`text-sm font-semibold ${
                          order.paymentStatus === 'completed'
                            ? 'text-emerald-700'
                            : order.paymentStatus === 'failed'
                            ? 'text-red-700'
                            : 'text-orange-700'
                        }`}>
                          {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Total Amount */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-nepal-700">
                        Total Amount:
                      </span>
                      <span className="font-display font-bold text-lg text-terracotta-600">
                        NPR {order.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Transaction Code (if available) */}
                    {order.esewaTransactionCode && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                        <p className="text-xs text-green-700">
                          <span className="font-medium">Transaction ID:</span>{' '}
                          <span className="font-mono">{order.esewaTransactionCode}</span>
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* View Details Button */}
                  <div className="pt-3 border-t border-nepal-200 mt-3">
                    <button className="text-sm text-terracotta-600 hover:text-terracotta-700 font-medium inline-flex items-center gap-1 group">
                      View Full Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
