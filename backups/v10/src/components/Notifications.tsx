import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

const mockNotifications = [
  {
    id: 1,
    title: 'New Message',
    description: 'You have a new message from your financial advisor.',
    time: '5 minutes ago'
  },
  {
    id: 2,
    title: 'Document Ready',
    description: 'Your financial report is ready for review.',
    time: '1 hour ago'
  }
]

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80">
          <CardContent className="p-4">
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div key={notification.id} className="space-y-1">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
