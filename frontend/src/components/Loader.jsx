import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-dark-200 dark:border-dark-800 border-t-primary-500"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 w-12 h-12 rounded-full border-4 border-dark-200 dark:border-dark-800 border-t-purple-500"
        />
        
        {/* Center Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
        />
      </div>
    </div>
  )
}
