import Link from 'next/link'
import Image from 'next/image'
import { Button } from "../components/ui/button"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-xl font-bold">Solventus</div>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
