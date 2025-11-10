export default function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'h-4 bg-nepal-200',
    circle: 'rounded-full bg-nepal-200',
    rect: 'rounded-md bg-nepal-200',
    text: 'h-3 bg-nepal-200 rounded',
  }

  return (
    <div
      className={`animate-pulse ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-4 space-y-4">
      <Skeleton variant="rect" className="w-full aspect-square" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-full h-4" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
