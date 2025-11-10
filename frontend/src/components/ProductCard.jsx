import { ShoppingCart, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = async (e) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation()
    
    setIsAddingToCart(true)
    try {
      await addItem(product._id)
      toast.success('Added to cart!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Link to={`/products/${product._id}`}>
      <div className="card card-hover group">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-nepal-100">
          <img
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay Actions (shown on hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-white text-nepal-900 p-3 rounded-full hover:bg-terracotta-600 hover:text-white transition-colors shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toast.success('Added to wishlist!')
              }}
              className="bg-white text-nepal-900 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-lg transform hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Badge (if on sale or new) */}
          {product.isNew && (
            <div className="absolute top-3 left-3">
              <span className="badge badge-primary shadow-sm">New</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-nepal-500 uppercase tracking-wider">
              {product.category}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-display font-semibold text-nepal-900 text-lg line-clamp-1 group-hover:text-terracotta-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-nepal-600 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-display font-bold text-terracotta-600 text-xl">
                NPR {product.price?.toLocaleString()}
              </p>
            </div>
            
            {/* Stock Status */}
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
