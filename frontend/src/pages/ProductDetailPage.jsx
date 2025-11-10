import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import { productApi } from '../services/productService'
import { useCartStore } from '../stores/cartStore'
import { PageLoader } from '../components/Loader'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCartStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id),
  })

  const product = data?.data?.product
  console.log(product);

  const handleAddToCart = async () => {
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

  if (isLoading) return <PageLoader />

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nepal-50/50">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-nepal-900 mb-2">
            Product not found
          </h2>
          <p className="text-nepal-600 mb-6">
            The product you're looking for doesn't exist
          </p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nepal-50/50 py-8 md:py-12">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-nepal-700 hover:text-terracotta-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Product Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-nepal-200 shadow-sm">
              <img
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share and Wishlist */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Link copied to clipboard!')
                }}
                className="flex-1 btn btn-outline"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => toast.success('Added to wishlist!')}
                className="flex-1 btn btn-outline"
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <div className="inline-block">
                <span className="badge badge-primary">
                  {product.category}
                </span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <h1 className="heading-2 mb-2">
                {product.name}
              </h1>
              <p className="text-nepal-600">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-nepal-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-nepal-600 mb-1">Price</p>
                  <p className="font-display font-bold text-3xl text-terracotta-600">
                    NPR {product.price?.toLocaleString()}
                  </p>
                </div>
                {/* Stock Status */}
                <div>
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">In Stock</span>
                    </div>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>

            {/* Stock Info */}
            {product.stock > 0 && (
              <div className="bg-nepal-100 rounded-lg p-4">
                <p className="text-sm text-nepal-700">
                  <span className="font-semibold">{product.stock}</span> items available
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl border border-nepal-200 p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg text-nepal-900">
                Product Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-nepal-100">
                  <span className="text-nepal-600">SKU</span>
                  <span className="font-medium text-nepal-900">{product._id?.slice(-8)}</span>
                </div>
                {product.category && (
                  <div className="flex justify-between py-2 border-b border-nepal-100">
                    <span className="text-nepal-600">Category</span>
                    <span className="font-medium text-nepal-900">{product.category}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-nepal-100">
                  <span className="text-nepal-600">Availability</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-nepal-100 to-terracotta-50 rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg text-nepal-900 mb-4">
                Why Choose NepWears?
              </h3>
              <ul className="space-y-3 text-sm text-nepal-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <span>Authentic Nepali craftsmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <span>Supporting local artisans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <span>Free shipping on orders over NPR 5000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
