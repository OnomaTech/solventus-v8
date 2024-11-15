import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { ClientDialog } from '../../../components/admin/dialogs/ClientDialog'
import { useClientDetails } from '../../../hooks/useClientDetails'
import { ClientTemplateView } from '../../../components/admin/client-template/ClientTemplateView'
import { useTemplateStorage } from '../../../hooks/useTemplateStorage'

export default function ClientDetailsPage() {
  const router = useRouter()
  const { id } = router.query
  const { client, isLoading, error, updateClient, deleteClient } = useClientDetails(id as string)
  const { templates } = useTemplateStorage()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error || 'Client not found'}
        </div>
      </div>
    )
  }

  const template = templates.find(t => t.id === client.templateId)

  const handleUpdate = async (updates: any) => {
    try {
      await updateClient(updates)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Failed to update client:', error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this client?')) return

    try {
      await deleteClient()
      router.push('/admin/clients')
    } catch (error) {
      console.error('Failed to delete client:', error)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {client.firstName} {client.lastName}
          </h1>
          {client.companyName && (
            <p className="text-muted-foreground">{client.companyName}</p>
          )}
        </div>
        <div className="space-x-2">
          <Button onClick={() => setIsEditDialogOpen(true)}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {template ? (
        <ClientTemplateView
          template={template}
          data={client.templateData || {}}
          readOnly
        />
      ) : (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          Template not found. The client's template may have been deleted.
        </div>
      )}

      <ClientDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdate}
        initialData={client}
        mode="edit"
      />
    </div>
  )
}
