import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturedCategories from "@/components/featured-categories"
import TrendingProducts from "@/components/trending-products"
import SaleSection from "@/components/sale-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TrendingProducts />
        <SaleSection />
      </main>
      <Footer />
    </div>
  )
}
