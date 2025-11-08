import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

export default function Alert({ type = 'info', title, message, onClose }) {
  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-800 dark:text-green-200',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-800 dark:text-red-200',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600 dark:text-orange-400',
      textColor: 'text-orange-800 dark:text-orange-200',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-800 dark:text-blue-200',
    },
  }

  const config = types[type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 flex items-start gap-3`}
    >
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.textColor}`}>{title}</h4>
        )}
        {message && <p className={`text-sm ${config.textColor}`}>{message}</p>}
      </div>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`${config.iconColor} hover:opacity-75 transition-opacity`}
        >
          <XCircle className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

// Usage:
// <Alert type="success" title="Success!" message="Your order has been placed." />
// <Alert type="error" message="Something went wrong." onClose={() => {}} />
