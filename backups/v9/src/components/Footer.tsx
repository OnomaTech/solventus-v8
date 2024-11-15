import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              Solventus provides cutting-edge AI solutions and consulting services to help businesses innovate and grow.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#consulting" className="text-gray-600 hover:text-gray-900">AI Consulting</Link></li>
              <li><Link href="/services#solutions" className="text-gray-600 hover:text-gray-900">Custom AI Solutions</Link></li>
              <li><Link href="/services#training" className="text-gray-600 hover:text-gray-900">AI Training</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@solventus.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Solventus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
