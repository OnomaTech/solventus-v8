import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <p className="text-gray-400">
            Solventus provides comprehensive financial solutions to help you achieve financial
            freedom and stability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
            <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link href="/services#financial-assessment" className="text-gray-400 hover:text-white">Financial Assessment</Link></li>
            <li><Link href="/services#debt-management" className="text-gray-400 hover:text-white">Debt Management</Link></li>
            <li><Link href="/services#credit-repair" className="text-gray-400 hover:text-white">Credit Repair</Link></li>
            <li><Link href="/services#financial-education" className="text-gray-400 hover:text-white">Financial Education</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">Email: info@solventus.io</li>
            <li className="text-gray-400">Phone: (555) 123-4567</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
          </div>
        </div>

        {/* Portal Access */}
        <div>
          <h3 className="font-bold mb-4">Portal Access</h3>
          <ul className="space-y-4">
            <li>
              <Link 
                href="/login" 
                className="text-gray-400 hover:text-white flex items-center bg-[#1E293B] p-3 rounded-lg transition-colors"
              >
                <span>Client Portal</span>
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/login" 
                className="text-gray-400 hover:text-white flex items-center bg-[#1E293B] p-3 rounded-lg transition-colors"
              >
                <span>Admin Dashboard</span>
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Solventus. All rights reserved.
        </p>
      </div>
    </footer>
  )
}