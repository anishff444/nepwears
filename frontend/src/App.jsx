import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './stores/themeStore'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AuthPage from './pages/AuthPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccess from './pages/OrderSuccess'
import PaymentFailed from './pages/PaymentFailed'
import OrdersPage from './pages/OrdersPage'

function App() {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on mount
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
  }, [theme])

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/signup" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <p className="text-xl text-dark-600 dark:text-dark-400 mb-6">
                  Page not found
                </p>
                <a href="/" className="btn-primary">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
