import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SaleSection() {
  return (
    <section className="px-4 md:px-40 py-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              Exclusive Summer Sale
            </h1>
            <p className="text-gray-900 text-base font-normal leading-normal max-w-2xl">
              Save up to 30% on select items. Limited time offer.
            </p>
          </div>
          <Link href="/products?category=sale">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
              Shop Sale Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
