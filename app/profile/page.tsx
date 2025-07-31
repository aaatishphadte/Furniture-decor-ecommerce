"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Heart, Receipt, MapPin, Truck } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const [activeSection, setActiveSection] = useState("account")
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    updateProfile({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
    })
  }

  const sidebarItems = [
    { id: "account", label: "Account Details", icon: User },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "orders", label: "Order History", icon: Receipt },
    { id: "addresses", label: "Address Book", icon: MapPin },
  ]

  const mockOrders = [
    {
      id: "123456",
      date: "July 15, 2024",
      status: "Delivered",
    },
    {
      id: "789012",
      date: "June 20, 2024",
      status: "Delivered",
    },
  ]

  const mockAddresses = [
    {
      id: "1",
      name: "Sophia Clark",
      address: "123 Maple Street, Anytown, CA 91234",
      type: "Home",
    },
  ]

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white p-4">
              <h1 className="text-gray-900 text-base font-medium leading-normal mb-4">My Account</h1>
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-sm font-medium leading-normal">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col max-w-4xl flex-1">
            {activeSection === "account" && (
              <div>
                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                  Account Details
                </h2>
                <div className="space-y-4 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-900 text-base font-medium leading-normal">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-900 text-base font-medium leading-normal">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-900 text-base font-medium leading-normal">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 text-base font-medium leading-normal">
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={handleSaveChanges} className="mt-4">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "wishlist" && (
              <div>
                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                  Wishlist
                </h2>
                <p className="text-gray-900 text-base font-normal leading-normal px-4 mb-4">
                  You have {wishlistItems.length} items in your wishlist.
                </p>
                <div className="space-y-4 px-4">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                      <Link href="/products">
                        <Button>Browse Products</Button>
                      </Link>
                    </div>
                  ) : (
                    wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                          style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div className="flex-1">
                          <p className="text-gray-900 text-base font-medium leading-normal">{item.name}</p>
                          <p className="text-gray-600 text-sm font-normal leading-normal">${item.price}</p>
                        </div>
                        <Link href={`/products/${item.id}`}>
                          <Button variant="outline" size="sm">
                            View Product
                          </Button>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeSection === "orders" && (
              <div>
                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                  Order History
                </h2>
                <p className="text-gray-900 text-base font-normal leading-normal px-4 mb-4">
                  You have {mockOrders.length} past orders.
                </p>
                <div className="space-y-4 px-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <div className="text-gray-900 flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-12">
                        <Truck size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-base font-medium leading-normal">
                          {order.status} on {order.date}
                        </p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">Order #{order.id}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "addresses" && (
              <div>
                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                  Address Book
                </h2>
                <p className="text-gray-900 text-base font-normal leading-normal px-4 mb-4">
                  You have {mockAddresses.length} saved address.
                </p>
                <div className="space-y-4 px-4">
                  {mockAddresses.map((address) => (
                    <div key={address.id} className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-900 flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-12">
                        <MapPin size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-base font-medium leading-normal">{address.name}</p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">{address.address}</p>
                        <p className="text-gray-600 text-sm font-normal leading-normal">{address.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    Add New Address
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
