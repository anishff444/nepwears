import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Menu, X, LogOut, Package } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const { openCart, getItemCount } = useCartStore()
  const navigate = useNavigate()
  const cartCount = getItemCount()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300  'bg-[rgba(#fff, 0.2)] backdrop-blur-md shadow-md'
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-nepal-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl font-display">N</span>
            </div>
            <span className="text-2xl font-display font-bold text-nepal-900 hidden sm:block">
              NepWears
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-nepal-700 hover:text-terracotta-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-nepal-700 hover:text-terracotta-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-nepal-700 hover:text-terracotta-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-nepal-700 hover:text-terracotta-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-nepal-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-nepal-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-nepal-100 rounded-full transition-colors">
                  <div className="w-8 h-8 bg-nepal-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-nepal-700" />
                  </div>
                  <span className="hidden lg:block text-nepal-700 font-medium">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-nepal-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2 space-y-1">
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 px-3 py-2 text-nepal-700 hover:bg-nepal-50 rounded-md transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-terracotta-600 text-white rounded-lg hover:bg-terracotta-700 transition-colors font-medium"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-nepal-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-nepal-700" />
              ) : (
                <Menu className="w-6 h-6 text-nepal-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-nepal-200 bg-white animate-slide-down">
          <div className="container-custom py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-nepal-700 hover:bg-nepal-50 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-nepal-700 hover:bg-nepal-50 rounded-md transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-nepal-700 hover:bg-nepal-50 rounded-md transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-nepal-700 hover:bg-nepal-50 rounded-md transition-colors"
            >
              Contact
            </Link>

            {!isAuthenticated && (
              <Link
                to="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 bg-terracotta-600 text-white rounded-md hover:bg-terracotta-700 transition-colors text-center font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
