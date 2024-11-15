import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  Menu,
  LogOut,
  BarChart,
  User
} from 'lucide-react'
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useAdminAuth } from "../../contexts/AdminAuthContext"

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Clients',
    href: '/admin/clients',
    icon: Users
  },
  {
    title: 'Appointments',
    href: '/admin/appointments',
    icon: Calendar
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const { user, signOut, isAdmin, loading } = useAdminAuth()

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login')
    }
  }, [user, isAdmin, loading, router])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut()
      // Wait for signOut to complete before redirecting
      await router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Show loading state while checking admin status
  if (loading || !user || !isAdmin || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="p-2">
          {sidebarItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center space-x-2",
              collapsed && "justify-center"
            )}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">
              {sidebarItems.find(item => item.href === router.pathname)?.title || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-5 w-5" />
                  {user?.email && <span className="hidden md:inline">{user.email}</span>}
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
