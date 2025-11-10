import { Link } from 'react-router-dom'
import { ArrowRight, Mountain, Heart, Shield, Sparkles } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productApi } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'

export default function HomePage() {
  // Fetch featured products
  const { data, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productApi.getAllProducts(),
  })

  const featuredProducts = data?.data?.products?.slice(0, 6) || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(135deg,rgba(0,0,0,0.8),rgba(0,0,0,0.5)),url('http://images.unsplash.com/photo-1622867305593-30b0d44bc073?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=720')] bg-cover bg-[center] overflow-hidden">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-terracotta-600 mb-6 shadow-sm">
              <Mountain className="w-4 h-4" />
              <span>Heritage • Craftsmanship • Pride</span>
            </div>

            {/* Heading */}
            <h1 className="heading-1 mb-6 animate-fade-in text-white">
              Wear Your 
              <span className="gradient-text"> Heritage</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-nepal-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover authentic Nepali fashion that celebrates the rich culture and timeless craftsmanship of the Himalayas. Every piece tells a story.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products" className="btn btn-primary text-lg px-8 py-3">
                Explore Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn btn-outline text-lg px-8 py-3">
                Our Story
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-nepal-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-nepal-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-nepal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mountain className="w-8 h-8 text-terracotta-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-nepal-900 mb-2">
                Authentic Heritage
              </h3>
              <p className="text-nepal-600 leading-relaxed">
                Every piece crafted with traditional Nepali techniques passed down through generations
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-nepal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-terracotta-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-nepal-900 mb-2">
                Made with Love
              </h3>
              <p className="text-nepal-600 leading-relaxed">
                Supporting local artisans and preserving Nepal's rich textile traditions
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-nepal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-terracotta-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-nepal-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-nepal-600 leading-relaxed">
                Handpicked materials and rigorous quality checks ensure lasting beauty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-nepal-50/50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-100 rounded-full text-sm font-medium text-terracotta-800 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Featured Collection</span>
            </div>
            <h2 className="heading-2 mb-4">
              Discover Our Favorites
            </h2>
            <p className="text-nepal-600 max-w-2xl mx-auto">
              Carefully curated pieces that embody the essence of Nepali craftsmanship and modern style
            </p>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Link to="/products" className="btn btn-primary text-lg px-8 py-3">
                  View All Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-terracotta-600 to-nepal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 nepal-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6 text-white">
              Join the NepWears Community
            </h2>
            <p className="text-lg text-terracotta-50 mb-8 leading-relaxed">
              Be part of a movement celebrating Nepali culture through fashion. Get exclusive access to new collections and special offers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth/signup"
                className="px-8 py-3 bg-white text-terracotta-600 rounded-lg hover:bg-nepal-50 transition-colors font-semibold text-lg inline-flex items-center gap-2"
              >
                Sign Up Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Preview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-nepal-700 leading-relaxed">
                <p>
                  NepWears was born from a passion to showcase Nepal's rich textile heritage to the world. We work directly with local artisans, preserving traditional craftsmanship while creating contemporary designs.
                </p>
                <p>
                  Each piece in our collection is more than just clothing—it's a celebration of Nepali culture, a testament to skilled craftsmanship, and a bridge between tradition and modernity.
                </p>
              </div>
              <Link to="/about" className="btn btn-outline mt-6">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-nepal-200">
                {/* Placeholder for brand image */}
                <div className="w-full h-full flex items-center justify-center bg-[url('/dhaka-topi.webp')] bg-cover bg-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
