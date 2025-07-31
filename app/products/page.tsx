import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import { Suspense } from "react"

export default function ProductsPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <ProductFilters />
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
