import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AdminLayout } from "../../../components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { ClientDialog } from "../../../components/admin/dialogs/ClientDialog"
import { Client, MOCK_CLIENTS } from "../../../types/clients"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

export default function ClientDetailsPage() {
  const router = useRouter()
  const [client, setClient] = useState<Client | undefined>()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      const foundClient = MOCK_CLIENTS.find(c => c.id === id)
      setClient(foundClient)
      setIsLoading(false)
    }
  }, [router.isReady, router.query])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!client) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/clients")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
          </div>
          <div className="text-lg text-red-600">Client not found</div>
        </div>
      </AdminLayout>
    )
  }

  const handleEditSubmit = (data: Partial<Client>) => {
    setClient({ ...client, ...data })
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      router.push("/admin/clients")
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/clients")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
            <h1 className="text-2xl font-bold">
              {client.firstName} {client.lastName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-medium capitalize">{client.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-medium capitalize">{client.status}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{client.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{client.phone}</div>
                    </div>
                    {client.companyName && (
                      <div className="col-span-2">
                        <div className="text-sm text-gray-500">Company</div>
                        <div className="font-medium">{client.companyName}</div>
                      </div>
                    )}
                    <div className="col-span-2">
                      <div className="text-sm text-gray-500">Joined</div>
                      <div className="font-medium">
                        {new Date(client.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Communication Preferences</div>
                    <div className="font-medium capitalize">
                      {client.preferences.communicationPreferences.join(", ")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Language</div>
                    <div className="font-medium uppercase">{client.preferences.language}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Timezone</div>
                    <div className="font-medium">{client.preferences.timezone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Marketing</div>
                    <div className="font-medium">
                      {client.preferences.marketingOptIn ? "Opted In" : "Opted Out"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {client.documents.length === 0 ? (
                  <div className="text-gray-500">No documents yet</div>
                ) : (
                  <div className="space-y-4">
                    {client.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {client.notes.length === 0 ? (
                  <div className="text-gray-500">No notes yet</div>
                ) : (
                  <div className="space-y-4">
                    {client.notes.map((note) => (
                      <div key={note.id} className="border-b pb-4 last:border-0">
                        <div className="font-medium">{note.content}</div>
                        <div className="text-sm text-gray-500">
                          Added by {note.createdBy} on{" "}
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                {client.activities.length === 0 ? (
                  <div className="text-gray-500">No activity yet</div>
                ) : (
                  <div className="space-y-4">
                    {client.activities.map((activity) => (
                      <div key={activity.id} className="border-b pb-4 last:border-0">
                        <div className="font-medium">{activity.description}</div>
                        <div className="text-sm text-gray-500">
                          {activity.performedBy} on{" "}
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ClientDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        client={client}
      />
    </AdminLayout>
  )
}
