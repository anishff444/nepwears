import { useNavigate } from 'react-router-dom'
import { XCircle, RefreshCw } from 'lucide-react'

export default function PaymentFailed() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-nepal-50/50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-nepal-200 p-8 mb-6 animate-slide-up">
          <h1 className="heading-2 text-red-600 mb-3">
            Payment Failed
          </h1>
          <p className="text-nepal-700 mb-6 leading-relaxed">
            We couldn't process your payment. This could be due to insufficient funds, incorrect payment details, or a network issue.
          </p>

          {/* Info Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-red-900 mb-2 text-sm">
              Common reasons for payment failure:
            </h3>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Insufficient balance in eSewa account</li>
              <li>Incorrect payment credentials</li>
              <li>Payment timeout or cancelled</li>
              <li>Network connectivity issues</li>
            </ul>
          </div>

          <p className="text-sm text-nepal-600 mb-6">
            Don't worry, no charges were made to your account. You can try again or contact support if the issue persists.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/checkout')}
              className="flex-1 btn btn-primary"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex-1 btn btn-outline"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-sm text-nepal-600 mb-4">
          Need help?{' '}
          <a href="#" className="text-terracotta-600 hover:text-terracotta-700 font-medium">
            Contact Support
          </a>
        </p>

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
