import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function ContentTabs() {
  return (
    <Tabs defaultValue="messages" className="mb-8">
      <TabsList>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
      </TabsList>

      <TabsContent value="messages">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Stay in touch with your financial coach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} alt="Coach avatar" />
                    <AvatarFallback>FC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Financial Coach</p>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                    <p className="text-xs text-gray-400 mt-1">June {i} 2023</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">View All Messages</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>Access and manage your financial documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Financial Plan.pdf', 'Budget Worksheet.pdf', 'Investment Strategy.pdf'].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                  <span>{doc}</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">Upload New Document</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="videos">
        <Card>
          <CardHeader>
            <CardTitle>Educational Videos</CardTitle>
            <CardDescription>Watch helpful videos about financial management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Budgeting Basics', 'Investment 101', 'Debt Management'].map((video, i) => (
                <div key={i} className="bg-gray-100 p-4 rounded">
                  <div className="bg-gray-300 h-32 mb-2 flex items-center justify-center">Video Thumbnail</div>
                  <p className="font-semibold">{video}</p>
                  <Button variant="link" size="sm" className="mt-2">Watch Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
