import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface NotificationsProps {
  onClose?: () => void
}

export function Notifications({ onClose }: NotificationsProps) {
  const notifications = [
    {
      id: 1,
      title: 'New Message from Financial Coach',
      message: 'Your monthly financial review is ready.',
      time: '5 minutes ago',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      title: 'Document Update',
      message: 'Your budget worksheet has been updated.',
      time: '1 hour ago',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      message: 'Your next coaching session is tomorrow at 2 PM.',
      time: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ]

  return (
    <Card className="absolute right-0 top-16 w-96 z-50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Notifications</h3>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={notification.avatar} alt="Notification avatar" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{notification.title}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
