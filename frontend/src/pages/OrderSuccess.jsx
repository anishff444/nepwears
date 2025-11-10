import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package } from 'lucide-react'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <div className="min-h-screen bg-nepal-50/50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-nepal-200 p-8 mb-6 animate-slide-up">
          <h1 className="heading-2 text-green-600 mb-3">
            Order Successful!
          </h1>
          <p className="text-nepal-700 mb-6 leading-relaxed">
            Thank you for your purchase. Your order has been confirmed and will be processed soon.
          </p>

          {/* Order Details */}
          <div className="bg-nepal-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-nepal-700 mb-2">
              <Package className="w-5 h-5" />
              <span className="font-medium">Order ID</span>
            </div>
            <p className="font-mono text-terracotta-600 font-semibold">
              {searchParams.get('orderId') || 'N/A'}
            </p>
          </div>

          <p className="text-sm text-nepal-600 mb-6">
            A confirmation email has been sent to your registered email address.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 btn btn-primary"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex-1 btn btn-outline"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Home Link */}
        <button
          onClick={() => navigate('/')}
          className="text-nepal-700 hover:text-terracotta-600 text-sm font-medium transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
