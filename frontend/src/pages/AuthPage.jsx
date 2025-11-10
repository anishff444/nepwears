import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mountain } from 'lucide-react'
import { authApi } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const isLoginPage = location.pathname.includes('/login')
  const [isLogin, setIsLogin] = useState(isLoginPage)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        // Login
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        })
        
        setAuth(response.user, response.token)
        toast.success('Welcome back!')
        navigate('/')
      } else {
        // Signup
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          setIsLoading(false)
          return
        }

        const response = await authApi.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })

        setAuth(response.user, response.token)
        toast.success('Account created successfully!')
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nepal-100 via-nepal-50 to-terracotta-50 nepal-pattern flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-nepal-600 rounded-xl flex items-center justify-center">
            <Mountain className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-display font-bold text-nepal-900">
            NepWears
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-nepal-200 overflow-hidden">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 border-b border-nepal-200">
            <button
              onClick={() => {
                setIsLogin(true)
                navigate('/auth/login')
              }}
              className={`py-4 font-medium transition-colors ${
                isLogin
                  ? 'text-terracotta-600 border-b-2 border-terracotta-600 bg-terracotta-50/50'
                  : 'text-nepal-600 hover:text-nepal-900 hover:bg-nepal-50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                navigate('/auth/signup')
              }}
              className={`py-4 font-medium transition-colors ${
                !isLogin
                  ? 'text-terracotta-600 border-b-2 border-terracotta-600 bg-terracotta-50/50'
                  : 'text-nepal-600 hover:text-nepal-900 hover:bg-nepal-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-nepal-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-nepal-600 text-sm">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Join the NepWears community today'}
              </p>
            </div>

            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-nepal-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-nepal-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-nepal-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="input"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-nepal-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-terracotta-600 hover:text-terracotta-700">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>

            {/* Terms (Signup only) */}
            {!isLogin && (
              <p className="text-xs text-nepal-500 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="text-terracotta-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-terracotta-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            )}
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-nepal-700 hover:text-terracotta-600 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
