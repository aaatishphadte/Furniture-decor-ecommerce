"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    name: "Modern Sofa",
    price: 499,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARLs8uQZHrKWPwA6IWP-v4bcN-gBa_RX4n2WefzrbqOjTjdseUQmeirGMyCIuAZN7FQzN7zvgrpcgZVAQ-XNNURXm784i67O70IPVAtwrAb0Aw0BNjnz6q_vI64tazRvD0bUg6gzODh0ob6DsqiZF2O4RZ54FVMnhSzmCkHbbBJuXWY0_h26etEXhs83QGDua9F6s6ygs4N2TNLP94LIWbBD-KWQeAt5UvAuUa-fmQoREZF9qkpJIvbyS7lWshNkmi8_Arj8rSKH0f?height=200&width=200",
    category: "furniture",
  },
  {
    id: "2",
    name: "Classic Armchair",
    price: 299,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWvfY-bNY_wyS3uUg3RG5WcL077f75RPZEohPxPTDk3COeCA2IoKvoRwhUu8W1zvkEDqIfe-T32Zr6hbIbMsyuYxTWjQPtwX404QRFpxfBtoJ3fAwG3kI9cFfBn7hkreP-97qRr9aZBqd4Cm3d6UZb3JThfceJmukQhhY5VFwdW0oWk4XWD8kwA--TsNV_a3OSdfKPw1J_AyVMfyNcnC9M0snP1ghyRdHxAX_9AGzZg3d6YomZY2fm00eSAPJV4ZaH-swAjZ1fbdpe?height=200&width=200",
    category: "furniture",
  },
  {
    id: "3",
    name: "Contemporary Coffee Table",
    price: 199,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1mFPFuB8xvqGaGaQ8s2GoCf_tAVOVEKtMYa8SaAbu5ZUnKRbaJ19Rw2cquY0B3x7iiqucZLJ5YVdtAigx_mPMbZWOFdnkUxePRgnNIbk9sTQUEKFlY9imZ15TfbaLu07BNSDXwWe3yA7wZM8IRybEGncxO0RB26pExNYDDvzyVY71y3oljYbj-BdCF8Pwc5ap4zWuCXujWAyvTEKjXY-AVn2fPGepClgf0A9sMuWXUG8UuLocKAJM_tceqtB3K_ZsVn7Qt1CSoAPs?height=200&width=200",
    category: "furniture",
  },
  {
    id: "4",
    name: "Elegant Bookshelf",
    price: 399,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqTAF0uISxcQq_WP20rfCLVxG_e73ybz_GRrsOr2LaQeeYYAVra7pnhn_ViehuoOSfst9JnHEGorjV3S6IOZrA-Y9KjxZO1ZOPGkYnXBHiRcj3dwjeXPPSmujmKyq3xTp5qv4PxVZO83WzOamegQa-M58d1eJSeNscwzuT4YPY57KkF6cQs0-CpCoXi9N0VKs6bnrG1rM21qXmTOrj9VXL3iJ8zX9Kr6fphddxfmgW9sPhBq_6NN3XneSHmT5YonFDtGF_ZT6rpFAY?height=200&width=200",
    category: "furniture",
  },
  {
    id: "5",
    name: "Minimalist TV Stand",
    price: 249,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlRAbyyFyKK6LZE3RykiZTAOx6GeNWmqP-j6_4aOppQD_ftnG8K2IXeUh7xd1S2BIcc-CQJzrXjUzP5FSyckGuK4YTDR5dBg-3Vxx_jH_sbDxTPAnPuOzfYRG72HVA9lUBsV9anCHQYGtuVVbzaFYwGrvMgXeMrGUYnjClx5HMVwrRniCp-jmzx08PKsLJTn-4lYhIm52efJl974CYucrad7wrsHoSIHNEM8DX0BHANb1RaZwWG9YnVo00F8iko32AHHiF_AoCkBF9?height=200&width=200",
    category: "furniture",
  },
  {
    id: "6",
    name: "Rustic Side Table",
    price: 149,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHuwVxxQ8s2ASGZcPlCFoxQN40PBAcsN9us4972zAOxb9m4B-v_Rcrg4eElO8Bf81TxKCwHgtuM39uKYQVwYQ115fwkFRStrxHI8ENW4xGhwe_UYcnFx8WAZHs3egbJnuH2jU2WHipzXeylm8lcZCpfvYleRdMEhuLTYqSSRT90esMi4efqVjqeonWZB6d07-5AWe9a0VJaV3LTE-tDHGDUumhaTr2TsVmXxgMzdRvYNWEON2caOyIGaBX7-dmDczzJRRWzQ247n6u?height=200&width=200",
    category: "furniture",
  },
]

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("popularity")
  const productsPerPage = 12

  const category = searchParams.get("category")

  useEffect(() => {
    // Filter products based on category
    let filteredProducts = sampleProducts
    if (category && category !== "all") {
      filteredProducts = sampleProducts.filter((product) => product.category === category || category === "sale")
    }
    setProducts(filteredProducts)
  }, [category])

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "newest", label: "New Arrivals" },
    { value: "rating", label: "Ratings" },
  ]

  const totalPages = Math.ceil(products.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col max-w-5xl flex-1">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 p-4">
        <Link href="/" className="text-gray-600 text-base font-medium leading-normal hover:text-gray-900">
          Home
        </Link>
        <span className="text-gray-600 text-base font-medium leading-normal">/</span>
        <span className="text-gray-900 text-base font-medium leading-normal">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
        </span>
      </div>

      {/* Page Title */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <h1 className="text-gray-900 text-3xl font-bold leading-tight min-w-72">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "All Products"}
        </h1>
      </div>

      {/* Sort Options */}
      <div className="pb-3">
        <div className="flex border-b border-gray-200 px-4 gap-8">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 transition-colors ${
                sortBy === option.value
                  ? "border-b-gray-900 text-gray-900"
                  : "border-b-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-wide">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center p-4 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "bg-gray-100" : ""}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}
    </div>
  )
}
