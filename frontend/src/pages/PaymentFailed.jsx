import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function PaymentFailed() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const reason = searchParams.get('reason')

  const getErrorMessage = () => {
    switch (reason) {
      case 'order_not_found':
        return 'Order not found. Please try again.'
      case 'invalid_signature':
        return 'Payment verification failed. Please contact support.'
      case 'amount_mismatch':
        return 'Payment amount mismatch. Please contact support.'
      default:
        return 'Your payment could not be processed. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-3xl p-8 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
          >
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2"
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-dark-600 dark:text-dark-400 mb-6"
          >
            {getErrorMessage()}
          </motion.p>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-4 mb-6 text-left"
          >
            <p className="text-sm text-dark-600 dark:text-dark-400">
              If you have been charged, the amount will be refunded within 5-7 business days.
              For assistance, please contact our support team.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="btn-secondary w-full inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
