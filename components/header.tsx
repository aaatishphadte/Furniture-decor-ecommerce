"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const navigationItems = [
    { name: "New Arrivals", href: "/products?category=new-arrivals" },
    { name: "Furniture", href: "/products?category=furniture" },
    { name: "Appliances", href: "/products?category=appliances" },
    { name: "Decor", href: "/products?category=decor" },
    { name: "Sale", href: "/products?category=sale" },
    { name: "Admin", href: "/admin" },
  ]

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/" className="flex items-center gap-4 text-gray-900">
          <div className="size-8">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">Roof&RoomMasters</h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-900 text-sm font-medium leading-normal hover:text-gray-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:block">
          <div className="flex w-full max-w-64 items-stretch rounded-lg h-10">
            <div className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pl-4 rounded-l-lg">
              <Search size={20} />
            </div>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none bg-gray-100 focus:ring-0 h-full rounded-l-none pl-2"
            />
          </div>
        </form>

        <div className="flex gap-2">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-6 pt-6">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="flex w-full items-stretch rounded-lg h-10">
                    <div className="text-gray-500 flex border-none bg-gray-100 items-center justify-center pl-4 rounded-l-lg">
                      <Search size={20} />
                    </div>
                    <Input
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border-none bg-gray-100 focus:ring-0 h-full rounded-l-none pl-2"
                    />
                  </div>
                </form>

                <nav className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-900 text-base font-medium leading-normal hover:text-gray-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Wishlist */}
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
