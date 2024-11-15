import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '../../../components/ui/button'
import { ClientDialog } from '../../../components/admin/dialogs/ClientDialog'
import { useClientList } from '../../../hooks/useClientList'
import { SimpleTable } from '../../../components/ui/simple-table'
import { PlusIcon } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Client } from '../../../types/clients'

export default function ClientsPage() {
  const router = useRouter()
  const { clients, isLoading, error, addClient } = useClientList()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const columns = [
    {
      key: 'firstName',
      header: 'First Name',
      searchable: true
    },
    {
      key: 'lastName',
      header: 'Last Name',
      searchable: true
    },
    {
      key: 'email',
      header: 'Email',
      searchable: true
    },
    {
      key: 'phone',
      header: 'Phone',
      searchable: true
    },
    {
      key: 'type',
      header: 'Type',
      searchable: true,
      cell: (row: Client) => (
        <Badge variant="outline">
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      searchable: true,
      cell: (row: Client) => {
        const variant = {
          active: 'default',
          inactive: 'secondary',
          pending: 'outline'
        }[row.status] || 'destructive'

        return (
          <Badge variant={variant as any}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </Badge>
        )
      }
    }
  ]

  const handleAddClient = async (data: Partial<Client>) => {
    try {
      const newClient = await addClient(data)
      setIsAddDialogOpen(false)
      router.push(`/admin/clients/${newClient.id}`)
    } catch (error) {
      console.error('Failed to create client:', error)
    }
  }

  const handleRowClick = (client: Client) => {
    router.push(`/admin/clients/${client.id}`)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <SimpleTable
          data={clients}
          columns={columns}
          onRowClick={handleRowClick}
          pageSize={10}
        />
      )}

      <ClientDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddClient}
        mode="create"
      />
    </div>
  )
}
