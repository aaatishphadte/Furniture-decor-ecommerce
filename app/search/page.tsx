"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductFilters from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Modern Fabric Sofa",
    price: 399,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
  {
    id: "2",
    name: "Leather Sectional Sofa",
    price: 799,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
  {
    id: "3",
    name: "Velvet Chaise Lounge",
    price: 549,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
  {
    id: "4",
    name: "Compact Loveseat",
    price: 299,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
  {
    id: "5",
    name: "Reclining Sofa",
    price: 699,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
  {
    id: "6",
    name: "Convertible Sofa Bed",
    price: 449,
    image: "/placeholder.svg?height=200&width=200",
    category: "furniture",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchQuery(query)

    // Filter products based on search query
    if (query) {
      const filtered = sampleProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
      setProducts(filtered)
    } else {
      setProducts(sampleProducts)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setProducts(sampleProducts)
    window.history.pushState({}, "", "/search")
  }

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "rating", label: "Rating (High to Low)" },
  ]

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <ProductFilters />
          <div className="flex flex-col max-w-5xl flex-1">
            {/* Search Bar */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch}>
                <div className="flex w-full items-stretch rounded-lg h-12">
                  <div className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pl-4 rounded-l-lg">
                    <Search size={24} />
                  </div>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-none bg-gray-100 focus:ring-0 h-full rounded-none pl-2"
                    placeholder="Search products..."
                  />
                  {searchQuery && (
                    <div className="flex items-center justify-center bg-gray-100 pr-4">
                      <Button type="button" variant="ghost" size="sm" onClick={clearSearch} className="p-0 h-auto">
                        <X size={24} className="text-gray-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 text-sm font-normal leading-normal px-4 mb-4">
              Showing {products.length} results
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            {/* Sort Options */}
            <div className="flex gap-3 p-3 flex-wrap">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className={sortBy === option.value ? "bg-gray-100" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
                <Link href="/products">
                  <Button>Browse All Products</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <div className="flex flex-col gap-3 pb-3">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      />
                      <div>
                        <p className="text-gray-900 text-base font-medium leading-normal group-hover:text-gray-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
