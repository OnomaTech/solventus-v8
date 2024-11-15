import Head from 'next/head'
import { useState } from 'react'
import { ArrowLeft, Settings } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [progress] = useState(66)
  const [showSettings, setShowSettings] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'ach'>('credit')
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Client Dashboard - Solventus</title>
        <meta name="description" content="View your financial coaching progress and resources" />
      </Head>

      {showSettings ? (
        <div className="container mx-auto px-4">
        <div className="relative">
                <Button
                  variant="ghost"
              size="icon"
                  onClick={() => setShowSettings(false)}
              className="absolute right-0 top-0"
                >
              <ArrowLeft className="h-5 w-5" />
                </Button>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user?.email || ''} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tel">Telephone</Label>
                    <Input id="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="cell">Cell Phone</Label>
                    <Input id="cell" placeholder="(555) 987-6543" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="smsOptIn" className="rounded" />
                    <Label htmlFor="smsOptIn">Opt in for SMS notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailOptIn" className="rounded" />
                    <Label htmlFor="emailOptIn">Opt in for email notifications</Label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Profile</Button>
                </div>
              </div>

              {/* Billing Information Section */}
              <h2 className="text-xl font-bold mb-4">Billing Information</h2>
              <Tabs defaultValue="payment" className="w-full">
                <TabsList>
                  <TabsTrigger value="payment">Payment Method</TabsTrigger>
                  <TabsTrigger value="address">Billing Address</TabsTrigger>
                </TabsList>

                <TabsContent value="payment">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button
                        variant={paymentMethod === 'credit' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        Credit Card
                      </Button>
                      <Button
                        variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('debit')}
                      >
                        Debit Card
                      </Button>
                      <Button
                        variant={paymentMethod === 'ach' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('ach')}
                      >
                        ACH Transfer
                      </Button>
                    </div>

                    {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">Security Code</Label>
                            <Input id="cvv" placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Card</Button>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'ach' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="routingNumber">Routing Number</Label>
                          <Input id="routingNumber" placeholder="123456789" />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input id="accountNumber" placeholder="987654321" type="password" />
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Bank Account</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="address">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="billingStreet">Street Address</Label>
                      <Input id="billingStreet" placeholder="123 Main St" />
                    </div>
                    <div>
                      <Label htmlFor="billingApt">Apt/Suite (Optional)</Label>
                      <Input id="billingApt" placeholder="Apt 4B" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" placeholder="New York" />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Input id="billingState" placeholder="NY" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input id="billingZip" placeholder="10001" />
                      </div>
                      <div>
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input id="billingCountry" placeholder="United States" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Billing Address</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        </div>
      ) : (
        <>
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
                <Button 
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
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
        </>
      )}
    </>
  )
}
