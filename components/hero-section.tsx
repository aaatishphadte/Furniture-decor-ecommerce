import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="px-4 md:px-40 flex flex-1 justify-center py-5">
      <div className="w-full max-w-6xl">
        <div className="relative">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 md:px-10 rounded-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO8hMM40jMsLKyQRYuCRFNNcgk1AkjXF01sZZLBVFMZnV5EItruDQaWBZ3M0bLA0_tbarahUHmrD-2FmJDD8QrJvB4V5riGZ0PDuay_nE_EMAsimalHj6W8Fh6TzfU1QeNVIGTxTn4Yi2rU3inUbzF-HHYRIgqfXUUemvYz425Xc8jx1N4fJfopol-kTy4YL0-8yGxCbOhPELLdcjNHeP7YXb_NR1SjmfGIugmSVIwhA30TvN3oLyvzytMG4kh92OAic_1Nl58Ld9z')`,            
            }}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Elevate Your Home
              </h1>
              <h2 className="text-white text-sm md:text-base font-normal leading-normal">
                Discover curated collections of furniture, appliances, and decor to create your dream space.
              </h2>
            </div>
            <Link href="/products">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
