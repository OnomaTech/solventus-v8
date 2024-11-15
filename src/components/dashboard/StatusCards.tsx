import { Settings } from 'lucide-react'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

interface StatusCardsProps {
  progress: number
  onSettingsClick: () => void
}

export function StatusCards({ progress, onSettingsClick }: StatusCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>File Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-600">In Progress</p>
          <Progress value={progress} className="mt-2" />
          <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl">June 15 2023</p>
          <p className="text-sm text-gray-500">2:00 PM EST</p>
          <Button className="mt-4">Reschedule</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <Button variant="outline">Upload Document</Button>
          <Button variant="outline">Send Message</Button>
          <Button 
            variant="outline"
            onClick={onSettingsClick}
            className="flex items-center justify-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
