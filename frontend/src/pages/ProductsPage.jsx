import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productApi } from '../services/productService'
import ProductCard from '../components/ProductCard'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('-createdAt')

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search, sort],
    queryFn: () => productApi.getAllProducts(),
  })

  const products = data?.data?.products || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Collection
          </h1>
          <p className="text-gray-600">
            Discover our premium selection of products
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none sm:w-48"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="-name">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-600">Loading products...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Failed to load products. Please try again.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">No products found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <>
            {/* Product Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
