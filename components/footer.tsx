import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-40">
        <div className="flex flex-col gap-6 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-around">
            <Link
              href="/customer-service"
              className="text-gray-600 text-base font-normal leading-normal hover:text-gray-900 transition-colors"
            >
              Customer Service
            </Link>
            <Link
              href="/about"
              className="text-gray-600 text-base font-normal leading-normal hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 text-base font-normal leading-normal hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 text-base font-normal leading-normal hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Facebook size={24} />
            </Link>
          </div>
          <p className="text-gray-600 text-base font-normal leading-normal">© 2024 Roof&RoomMasters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
