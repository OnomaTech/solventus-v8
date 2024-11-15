import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AdminLayout } from "../../../components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react'
import { AddClientDialog } from "../../../components/admin/dialogs/AddClientDialog"

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastContact: "2024-01-15",
    documents: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    status: "Active",
    lastContact: "2024-01-14",
    documents: 3
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    lastContact: "2024-01-10",
    documents: 2
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 456-7890",
    status: "Active",
    lastContact: "2024-01-13",
    documents: 7
  },
  {
    id: 5,
    name: "James Lee",
    email: "james.lee@example.com",
    phone: "(555) 567-8901",
    status: "Pending",
    lastContact: "2024-01-12",
    documents: 1
  }
]

export default function ClientsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddClient = (data: any) => {
    console.log('New client data:', data)
    // Here we would normally make an API call to add the client
    setIsAddDialogOpen(false)
  }

  const handleRowClick = (clientId: number) => {
    router.push(`/admin/clients/${clientId}`)
  }

  return (
    <AdminLayout>
      <Head>
        <title>Clients - Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="border rounded-md px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <Button 
            className="ml-4"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Contact</th>
                    <th className="text-left py-3 px-4">Documents</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(client.id)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{client.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-4 w-4 mr-2" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-2" />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${client.status === 'Active' ? 'bg-green-100 text-green-800' :
                            client.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(client.lastContact).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-sm text-gray-500">
                          {client.documents} files
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Add action menu logic here
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddClientDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddClient}
      />
    </AdminLayout>
  )
}
