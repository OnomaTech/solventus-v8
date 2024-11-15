import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AdminLayout } from "../../../components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { 
  User, Mail, Phone, MapPin, FileText, Calendar, 
  Clock, ArrowLeft, Save, Trash, Download
} from 'lucide-react'

// Mock client data
const mockClient = {
  id: 1,
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  cell: "(555) 987-6543",
  address: "123 Main St, New York, NY 10001",
  status: "Active",
  joinDate: "2023-06-15",
  lastContact: "2024-01-15",
  documents: [
    { id: 1, name: "Financial Assessment.pdf", date: "2024-01-15" },
    { id: 2, name: "Credit Report.pdf", date: "2024-01-10" },
    { id: 3, name: "Budget Plan.xlsx", date: "2024-01-05" }
  ],
  appointments: [
    { id: 1, date: "2024-01-20", time: "10:00 AM", type: "Financial Review" },
    { id: 2, date: "2024-02-05", time: "2:30 PM", type: "Budget Planning" }
  ],
  notes: [
    { id: 1, date: "2024-01-15", text: "Discussed investment options" },
    { id: 2, date: "2024-01-10", text: "Reviewed credit report" },
    { id: 3, date: "2024-01-05", text: "Created initial budget plan" }
  ]
}

export default function ClientDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <AdminLayout>
      <Head>
        <title>{mockClient.name} - Client Details</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/admin/clients')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{mockClient.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${mockClient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {mockClient.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Client
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Client Information Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.name}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.email}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.phone}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Cell Phone</Label>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.cell}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.address}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Join Date</Label>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <Input
                          defaultValue={mockClient.joinDate}
                          disabled={!isEditing}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Button>Upload Document</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClient.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Added on {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Appointments</CardTitle>
                  <Button>Schedule Appointment</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClient.appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">{apt.type}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(apt.date).toLocaleDateString()} at {apt.time}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Reschedule</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Notes</CardTitle>
                  <Button>Add Note</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClient.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
