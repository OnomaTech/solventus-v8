import { Card, CardContent } from "./ui/card"
import { X } from 'lucide-react'
import { Button } from "./ui/button"

const mockNotifications = [
  {
    id: 1,
    title: 'New Message',
    description: 'You have a new message from your financial advisor.',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: 2,
    title: 'Document Ready',
    description: 'Your financial report is ready for review.',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    title: 'Appointment Reminder',
    description: 'Your next appointment is tomorrow at 2:00 PM EST.',
    time: '2 hours ago',
    unread: true
  }
]

interface NotificationsProps {
  onClose: () => void;
}

export function Notifications({ onClose }: NotificationsProps) {
  return (
    <Card className="w-80 shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-primary cursor-pointer hover:underline">
              Mark all as read
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`space-y-1 p-2 rounded-lg transition-colors ${
                notification.unread ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                {notification.unread && (
                  <span className="h-2 w-2 bg-primary rounded-full" />
                )}
              </div>
              <p className="text-sm text-gray-500">{notification.description}</p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-primary hover:underline w-full text-center">
            View all notifications
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
