"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const shipping = 49
  const tax = total * 0.05
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="w-full max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/" className="text-gray-600 text-base font-medium leading-normal hover:text-gray-900">
                Home
              </Link>
              <span className="text-gray-600 text-base font-medium leading-normal">/</span>
              <span className="text-gray-900 text-base font-medium leading-normal">Shopping Cart</span>
            </div>

            <h1 className="text-gray-900 text-3xl font-bold leading-tight px-4 mb-6">
              Shopping Cart ({items.length} items)
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 flex-shrink-0"
                        style={{ backgroundImage: `url("${item.image}")` }}
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-base font-medium leading-normal">{item.name}</h3>
                        <p className="text-gray-600 text-sm font-normal leading-normal">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 text-base font-normal leading-normal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 mt-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-gray-900 text-xl font-bold leading-tight mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm font-normal leading-normal">Subtotal</span>
                      <span className="text-gray-900 text-sm font-normal leading-normal">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm font-normal leading-normal">Shipping</span>
                      <span className="text-gray-900 text-sm font-normal leading-normal">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm font-normal leading-normal">Estimated Tax</span>
                      <span className="text-gray-900 text-sm font-normal leading-normal">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-900 text-base font-medium leading-normal">Total</span>
                        <span className="text-gray-900 text-base font-medium leading-normal">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">Proceed to Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
