import { Loader2 } from 'lucide-react'

export default function Loader({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizes[size]} animate-spin text-terracotta-600`} />
      {text && <p className="text-nepal-600 text-sm font-medium">{text}</p>}
    </div>
  )
}

export function LoadingOverlay({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <Loader size="lg" text={text} />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nepal-50">
      <Loader size="xl" text="Loading..." />
    </div>
  )
}
