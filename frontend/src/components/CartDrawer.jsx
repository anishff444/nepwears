import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function CartDrawer() {
  const { isOpen, closeCart, cart, removeItem, fetchCart, getTotal, getItemCount } = useCartStore()
  const navigate = useNavigate()
  
  const total = getTotal()
  const itemCount = getItemCount()

  useEffect(() => {
    if (isOpen) {
      fetchCart()
    }
  }, [isOpen, fetchCart])

  const handleRemoveItem = async (productId) => {
    try {
      await removeItem(productId)
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error('Failed to remove item')
    }
  }

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nepal-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-terracotta-600" />
            <div>
              <h2 className="text-xl font-display font-bold text-nepal-900">
                Shopping Cart
              </h2>
              <p className="text-sm text-nepal-500">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-nepal-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-nepal-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {!cart || cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-nepal-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-nepal-400" />
              </div>
              <h3 className="text-lg font-display font-semibold text-nepal-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-nepal-500 text-sm mb-6">
                Add some items to get started
              </p>
              <button
                onClick={() => {
                  closeCart()
                  navigate('/products')
                }}
                className="btn btn-primary"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId?._id}
                  className="bg-nepal-50 rounded-lg p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.productId?.imageUrl || '/placeholder.jpg'}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-nepal-900 truncate">
                      {item.productId?.name}
                    </h3>
                    <p className="text-sm text-nepal-600 mt-1">
                      NPR {item.productId?.price?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-nepal-600">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.productId?._id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-md transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.length > 0 && (
          <div className="border-t border-nepal-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-nepal-700">Subtotal</span>
              <span className="font-display font-bold text-nepal-900">
                NPR {total.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full btn btn-primary text-lg py-3"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-nepal-500 text-center">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
