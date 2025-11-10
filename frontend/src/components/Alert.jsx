import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useEffect } from 'react'

export default function Alert({ 
  type = 'info', 
  message, 
  onClose, 
  autoClose = true,
  duration = 5000 
}) {
  const types = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-500'
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      iconColor: 'text-amber-500'
    },
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-500'
    }
  }

  const config = types[type] || types.info
  const Icon = config.icon

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-lg p-4 flex items-start gap-3 shadow-sm
        animate-slide-down
      `}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded hover:bg-black/10 p-1 transition-colors"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// Toast Container Component
export function AlertContainer({ alerts = [] }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full pointer-events-none">
      <div className="pointer-events-auto space-y-2">
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  )
}
