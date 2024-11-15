import { Bell } from 'lucide-react'
import { Button } from './ui/button'
import { Notifications } from './Notifications'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAvatarUpload } from '../hooks/useAvatarUpload'
import { useState } from 'react'

interface DashboardHeaderProps {
  userEmail: string
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
  onLogout: () => void
}

export function DashboardHeader({ 
  userEmail, 
  showNotifications, 
  setShowNotifications, 
  onLogout 
}: DashboardHeaderProps) {
  const { uploadAvatar, uploading } = useAvatarUpload()
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await uploadAvatar(event)
      if (url) {
        setAvatarUrl(url)
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={uploading}
            />
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl || `https://ui-avatars.com/api/?name=${userEmail}`} />
              <AvatarFallback>
                {userEmail?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </label>
          <h1 className="text-xl font-semibold">Welcome back {userEmail}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
        {showNotifications && (
          <Notifications onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </header>
  )
}
