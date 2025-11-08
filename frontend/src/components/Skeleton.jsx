import { motion } from 'framer-motion'

export default function Skeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`shimmer rounded-xl bg-dark-200 dark:bg-dark-800 ${className}`}
        />
      ))}
    </>
  )
}

// Usage examples:
// <Skeleton className="h-64 w-full" />  // Single skeleton
// <Skeleton className="h-20 w-full" count={3} />  // Multiple skeletons
