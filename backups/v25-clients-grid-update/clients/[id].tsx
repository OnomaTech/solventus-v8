import { useRouter } from 'next/router'
import { useClientDetails } from '../../../hooks/useClientDetails'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { ClientDialog } from '../../../components/admin/dialogs/ClientDialog'
import { useState } from 'react'
import Link from 'next/link'

export default function ClientDetailsPage() {
  const router = useRouter()
  const { id } = router.query
  const { client, isLoading, error, updateClient, deleteClient } = useClientDetails(id as string)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this client?')) return

    try {
      await deleteClient()
      router.push('/admin/clients')
    } catch (err) {
      console.error('Failed to delete client:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="p-8">
        <div className="bg-muted p-4 rounded-md text-muted-foreground">
          Client not found
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/clients">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Client Details</h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">
                  {client.firstName} {client.lastName}
                </div>
              </div>
              {client.companyName && (
                <div>
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-medium">{client.companyName}</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{client.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{client.phone}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <Badge variant="secondary" className="capitalize mt-1">
                  {client.type}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge className="capitalize mt-1">
                  {client.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {client.templateId && (
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Template Data</h2>
            <pre className="bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(client.templateData, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Activity History</h2>
          <div className="space-y-4">
            {client.activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <div className="font-medium">{activity.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()} by {activity.performedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ClientDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={updateClient}
        client={client}
      />
    </div>
  )
}
