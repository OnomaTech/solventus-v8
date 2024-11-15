import { ReactNode, useState } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { useAuth } from '../contexts/AuthContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userEmail={user?.email || ''}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        onLogout={signOut}
      />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
