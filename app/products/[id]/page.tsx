"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Star, Heart, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"

// Mock product data
const productData = {
  id: "1",
  name: "Modern Velvet Sofa",
  sku: "123456789",
  price: 799,
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ61JNHr42T0j2vSSyrm08I1VZSMQ3_sM7o8ESbUAfeM0ZFd5fvzTSmNkYYVgY4IGC_XucSmUzjXx5NJQgvMt2pzJwUcUPQbJOf8OPe6J-SoGHM3GLZGYVkMvMOIXZfieBAiannDeQl37F0QBVyrVUvCZxAW00erhzAtV_r9aLSGjKR2npvf5bv3a7BrHdpRF8izveb0LCSZORxrFCUHqAW54713KKpRZzJKsT0qzLGc8DIFTupzmcIYaqSCrOckf-AoUknSKVBPpL?height=400&width=600",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhcm54ZYjQHviAWWTuKA3Ls6JHnErmjmCH9Q3ICvtl4c51C8Rb_NhU9TMGTCnKt1qwdR4peNfnvafdJS2YD8RfkRA2GaCj4C8uJo8TvY83l9_sxSiHP3tzM99Iy34hTy_VYP3kzSewBZE18zQH5Au6W1HoNeUCrLuCgercfNxzHHfXR6g2C1WL9pkHFqetQbllrHB8fQUx0KL1r1EZduBSJoeMjEn1DZJZpTT2KAfCiPpbeUQz58yYrQZxWKkFietvYtGwxqLKXHmX?height=400&width=600",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDy2T0KpqU3dU7LVrXDpk7OwUUc56O9DRn0EQrQpqzGuK2Ap7rTIlBuwv3ikDxyXrhrzvojcBKQPO1GY78S64nH0A_EjCm96gv1pPO9q_2eN8iEfV3QJ0ouznqwUpQUdyDKYpeYTTZvrIoJjR0TgkBFBI8AkWXXl2UyXkexEqL4FopLrEbJwpcdpNRafgslYd9T_Tco9L6D7KM12Mw6R48wmFsyPU7S7FgyNs0IzCdqkxTFSoXuoImjdCLYfVYNUCQGFzCPRQR4Cvug?height=400&width=600",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwlpS3efRYd-NkyVDoyE7r7PjuC55tMCzB8r7bNGZWjHAegWLE9fpn1z7b9MNGz910dnrN7QKGhO8suKGu2jA5OWpywBm1eQs9TJp1-NJTJzahc0esy9GxxSv_LoqBfyeFCELFPFA7HvUgIf3uU5eS8Ah_OyV4nCvznIA_BxY30dyxNeKA71hRh2LTeJR0b34voItupAbS52iUmq4BqLp6bEmdHS5LWDz9eOOR2KplxwPSoZmiUZ3Sn407pFalXap6hAxgP0qIgFC4?height=400&width=600",
  ],
  description:
    "This modern velvet sofa is the perfect addition to any living room. Its sleek design and plush velvet upholstery provide both style and comfort. Available in a variety of colors to match your decor.",
  specifications: {
    Material: "Velvet, Wood",
    Dimensions: '84"W x 36"D x 32"H',
    Weight: "120 lbs",
    "Assembly Required": "Yes",
  },
  rating: 4.5,
  reviewCount: 150,
  reviews: [
    {
      id: "1",
      author: "Sophia Carter",
      rating: 5,
      date: "1 month ago",
      content:
        "Absolutely love this sofa! The velvet is so soft and the design is very modern. It fits perfectly in my living room and is incredibly comfortable.",
      likes: 20,
      dislikes: 2,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9SLop9xJtN9B539lPisNze_3WG-sLtVJtG7zRSV6OfaYCFkFV0-yAucOt-JYdgAxIdwO2annxHPVkyzyzAjzM8VEIjTzIVaCOG57c2Cfmv66Ln1IgdxCXBFg3Y7CCzPXe2Bz7GKC75f3IJ2-Ue7OA0GX0kFufbJd462PTd-sQZIktvvxhDgypsVHQegLin5fw7vX80JgIPf5CY-bl0fNpLqr_YFCoQqfgXbNMsfNSn9HyUsIfsFbUpjHlGoH2LY_HdrmIoE5j_YLV?height=40&width=40",
    },
    {
      id: "2",
      author: "Liam Bennett",
      rating: 4,
      date: "2 months ago",
      content:
        "The sofa is great, but the color was slightly different than expected. Overall, it's a good quality piece of furniture.",
      likes: 15,
      dislikes: 3,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAsS3Yo1QkDn2Nby5j_R_SViv06345TFN1TKt-9QYjRbvtxchfQDykuRVm2uuyjZQiQfEw2S0zs2ACPDP18sjO7Poj1h-92W4-Htie_vivaxNUj0Lt2hEOaA6Lzv5tcdXrjNMzBwT4eMHG7SA5cOL5Je7EE-EElk_NM5VBRkNnGDZxUG4kXkkmdWtFZQCFeIUH3kNdY70P3ZvO6okbQDuI-wEls1-RZfHbz9bAd32DEGbJWpRHIqglMsBsTMdb7OCIyRgpvrlQhL5d?height=40&width=40",
    },
  ],
}

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = productData // In real app, fetch based on params.id

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      })
    }
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="w-full max-w-6xl">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/" className="text-gray-600 text-base font-medium leading-normal hover:text-gray-900">
                Home
              </Link>
              <span className="text-gray-600 text-base font-medium leading-normal">/</span>
              <Link
                href="/products?category=furniture"
                className="text-gray-600 text-base font-medium leading-normal hover:text-gray-900"
              >
                Furniture
              </Link>
              <span className="text-gray-600 text-base font-medium leading-normal">/</span>
              <span className="text-gray-900 text-base font-medium leading-normal">Sofas</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
              {/* Product Images */}
              <div className="space-y-4">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{ backgroundImage: `url("${product.images[selectedImageIndex]}")` }}
                />
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg bg-cover bg-center border-2 transition-colors ${
                        selectedImageIndex === index ? "border-gray-900" : "border-gray-200"
                      }`}
                      style={{ backgroundImage: `url("${image}")` }}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 text-3xl font-bold leading-tight mb-2">{product.name}</h1>
                  <p className="text-gray-600 text-sm font-normal leading-normal">SKU: {product.sku}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">{renderStars(product.rating)}</div>
                    <span className="text-gray-600 text-sm">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900">${product.price}</div>

                <div>
                  <h3 className="text-gray-900 text-lg font-bold leading-tight mb-2">Product Overview</h3>
                  <p className="text-gray-900 text-base font-normal leading-normal">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <label className="text-gray-900 text-base font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button onClick={handleAddToCart} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Buy Now
                  </Button>
                </div>

                <Button variant="ghost" onClick={handleWishlistToggle} className="w-full">
                  <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} />
                  {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-4 mt-8">
              <h3 className="text-gray-900 text-lg font-bold leading-tight mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600 text-sm font-normal leading-normal">{key}</span>
                    <span className="text-gray-900 text-sm font-normal leading-normal">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="p-4 mt-8">
              <h3 className="text-gray-900 text-lg font-bold leading-tight mb-6">Customer Reviews</h3>

              {/* Review Summary */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-900 text-4xl font-black leading-tight">{product.rating}</p>
                  <div className="flex gap-1">{renderStars(product.rating)}</div>
                  <p className="text-gray-900 text-base font-normal leading-normal">{product.reviewCount} reviews</p>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="flex flex-col gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: `url("${review.avatar}")` }}
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 text-base font-medium leading-normal">{review.author}</p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                    <p className="text-gray-900 text-base font-normal leading-normal">{review.content}</p>
                    <div className="flex gap-6 text-gray-600">
                      <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                        <ThumbsUp size={20} />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                        <ThumbsDown size={20} />
                        <span>{review.dislikes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
