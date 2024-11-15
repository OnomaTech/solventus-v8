import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from "../lib/utils"

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/settings', label: 'Settings' },
  { href: '/dashboard/documents', label: 'Documents' },
  { href: '/dashboard/messages', label: 'Messages' }
]

export function DashboardSidebar() {
  const router = useRouter()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            router.pathname === item.href
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
