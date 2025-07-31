import Link from "next/link"

const categories = [
  {
    name: "Living Room Furniture",
    href: "/products?category=living-room",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkc31uwU8HjGXOP8m23rsJykxQxJXe0XI6pamiVokdJWDBkJsRfn0OHBGCLcqJQ1auYd8N5HN5eQRwAsIB-riu-B3Zyhrg9BQyzva2zyQBSUcYXvpAcwrLceecj12K2qH702OZtJ-hB8Rxx3c3sW52DzlFFkP3lVzf3_1eOsVEkTsX9De-2eTpFumBv5PBzD6b9sDQtYCGeu0oOQx4nIDTCElvlVKlBKI9IGyjfTIYaSGJOI4sW7eU__xskxar1T1nr7R3urcmCpvs?height=200&width=300",
  },
  {
    name: "Kitchen Appliances",
    href: "/products?category=kitchen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCweTOujLzfUf0164grIQsHRhG_qWc9DhB75PnW9ZauKUchsBzEpQw2QPavd5pZgWIZ25Azb1tmzl4hYNraBPD4Hm6lTya-5xQQOJAtMX8OqbCBiM-10xirVhvnP55mwSFr0vfIfUe7GRXLGWKkfceot039efZT-BK0XQ93JC4k09Bgv_k2jyQ24vBxpyS48z4fgxqW_G_4hgw-TvdqaugwtOmFxXm5t0y_A_zphX0Ej2XOQiRsW5If_C4iILsOXXg7zPHVHP2-6ufM?height=200&width=300",
  },
  {
    name: "Home Decor",
    href: "/products?category=decor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY3Cz1Io0Jz6eDDfbNOgy4Who5j41hbN_PMtWHac6qEftdpmcX0yfmsHi04971AZXS_HyOyRUJS6WgYOOA4maQDHyqYZJDrvuk7rRud0HS3HYEl15JSKun2no_hHXgoEqua_2FulPPQEN8HdOsl6BnogNZ4lhrkfoDqcMgDaryAJt0Vy2_mksV7ZGqORrMbJaPrgMleSgI27ZvM07jBAivr0uUno8QZKJplc5K6x1H3AqCLs1puXEmjqmZHgOcycRouTv2Zs2KAWir?height=200&width=300",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="px-4 md:px-40 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="flex flex-col gap-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url("${category.image}")` }}
                />
                <p className="text-gray-900 text-base font-medium leading-normal group-hover:text-gray-600 transition-colors">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
