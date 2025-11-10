import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal } from 'lucide-react'
import { productApi } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('-createdAt')
  const [showFilters, setShowFilters] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search, sort],
    queryFn: () => productApi.getAllProducts(),
  })

  const products = data?.data?.products || []

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description?.toLowerCase().includes(search.toLowerCase())
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case '-createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'createdAt':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'price':
        return a.price - b.price
      case '-price':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case '-name':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-nepal-50/50 py-8 md:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="heading-2 mb-3">
            Our Collection
          </h1>
          <p className="text-nepal-600 max-w-2xl mx-auto">
            Explore our curated selection of authentic Nepali fashion
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-nepal-200 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nepal-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-nepal-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2.5 border border-nepal-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none transition-all bg-white md:w-56"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2.5 border border-nepal-300 rounded-lg hover:bg-nepal-50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-nepal-600" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="mt-4 pt-4 border-t border-nepal-200">
              <p className="text-sm text-nepal-600">
                Showing <span className="font-semibold text-nepal-900">{sortedProducts.length}</span> product{sortedProducts.length !== 1 && 's'}
              </p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={9} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-600 font-medium mb-2">Failed to load products</p>
            <p className="text-red-500 text-sm">Please try again later</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-nepal-200 p-12 text-center">
            <div className="w-20 h-20 bg-nepal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-nepal-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-nepal-900 mb-2">
              No products found
            </h3>
            <p className="text-nepal-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearch('')
                setSort('-createdAt')
              }}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination could be added here */}
          </>
        )}
      </div>
    </div>
  )
}
