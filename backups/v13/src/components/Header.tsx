import Link from 'next/link'
import Image from 'next/image'
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-[150px] h-[40px]">
            <Image
              src="/images/solventus-logo.svg"
              alt="Solventus"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
