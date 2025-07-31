"use client"
import Link from "next/link"
import { Star } from "lucide-react"

interface Product {
  id: string
  name: string
  rating: number
  image: string
  href: string
}

const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Plush Sofa",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjzxLhI1Gv9BmbvkFZPxZCJoOFF_8qA1tlxltjYeSDe5-C6YYtS3l99WVWObNqSkPymjVsyk__BGD81rB25frrcfJIAMUm23iTqltjpxOk7c9zJBf4e6_FPRl3gk7ffUv7ZB6Cw2T5oSDOGFSZV5a1p3xA5yHVL5dle-RslCgYP_YShuvzI-ExtxOGeJrAj2w1xYdguhvciPAGQTeq38CP8MU7lp9OTW44Jmmi7ML7G4dfyjClyNm_TyFqZGoflXGC9nxM26tChIc1?height=200&width=200",
    href: "/products/plush-sofa",
  },
  {
    id: "2",
    name: "Smart Refrigerator",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHgP_B3xeyDhB_sDwkK5Icg27bdZcvgG9-7COGd5Lzmd423yMZ2A94s8tLNN7vNibWIl26Ds0MrMYtT1Loby7uEOTJkM6VvWYV52hTo0Px2Tu7gBlsDa_7N0N6pzv1B4ftHaUiNaDRzkqvsZdlkKZXoJeUjo4-WL4-85blpnXsQn2o-8HfIXyf6r4mVDZkLXmmrDIkWmfHy67LdzDhMtRBhwUxfadviwTe3UnzMflDBdMyvZ3JSoAxhiv3jiHCnqzwgSsY4r2SPjNm?height=200&width=200",
    href: "/products/smart-refrigerator",
  },
  {
    id: "3",
    name: "Ambient Table Lamp",
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxpNHto0JW-5MslmDxkcgAv1itZmgZmTLxjjYMiF9wNGdq9OaX_SNrcZVwjemUjzIOF57ggv95G11FqTsXe4JnI5CPVJSmtrqdI9P2UMEwAHgPLzYmQoNCpPs58NRdJsMdt4k2cTPPQRYYFQxeaHYJsEIbHvUkFziZ6PmZ1m8IWeothrVYZAu2SYZo-qBA0tvueuErehO68e6-jHjFoLN95L8J7Sl_vCDKK4Ad-dseKJ4NztgGafii2vH9sauMs032NwGgshx_uisS?height=200&width=200",
    href: "/products/ambient-table-lamp",
  },
  {
    id: "4",
    name: "Extendable Dining Table",
    rating: 4.4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSKnKw4Y8g2Z0SGzKeFzs70cImBbb4PWjFV-IagBis_Ss6vF_rsQskQtl9o9pMhSTQrr4WVDcRzawETuz92jxrhmeVxxpy2Omf26QIDnwPZvXV9yLg0hVDEKOSVtyJBKSjcibJJtelyv0RBobtT1RkqtCnMTl1SiML_Ev-Lwx9LP7QuEi5jNfwd5GOWb2Ulxuyj9YrC1lGXDqbgz-Lc_GPan0vJoBe55SCKd5oG3Fvp0JMywCpZyLBlZi9MZ-BZV4i9HpKQRVLl1wB?height=200&width=200",
    href: "/products/extendable-dining-table",
  },
]

export default function TrendingProducts() {
  return (
    <section className="px-4 md:px-40 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight mb-6">Trending Products</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {trendingProducts.map((product) => (
            <Link key={product.id} href={product.href} className="group flex-shrink-0">
              <div className="flex flex-col gap-4 min-w-40">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url("${product.image}")` }}
                />
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 text-sm">{product.rating} stars</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
