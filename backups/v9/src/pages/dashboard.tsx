import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function Dashboard() {
  const [progress, setProgress] = useState(66)

  return (
    <>
      <Head>
        <title>Client Dashboard - Solventus</title>
        <meta name="description" content="View your financial coaching progress and resources" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back John Doe</h1>
          <Link href="/profile">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>File Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-green-600">In Progress</p>
              <Progress value={progress} className="mt-2" />
              <p className="text-sm text-gray-500 mt-2">66% complete</p>
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
              <Button variant="outline">View Resources</Button>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </>
  )
}
