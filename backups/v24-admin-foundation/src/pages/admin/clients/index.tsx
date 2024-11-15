"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { AddClientDialog } from "../../../components/admin/dialogs/AddClientDialog"
import { PlusCircle, Search } from "lucide-react"
import { Client, MOCK_CLIENTS } from "../../../types/clients"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddClient = (data: Partial<Client>) => {
    const newClient = {
      ...data,
      id: (clients.length + 1).toString(),
    } as Client

    setClients([...clients, newClient])
    setIsAddDialogOpen(false)
  }

  const filteredClients = clients.filter(client => {
    const searchLower = searchQuery.toLowerCase()
    return (
      client.firstName.toLowerCase().includes(searchLower) ||
      client.lastName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.toLowerCase().includes(searchLower) ||
      client.status.toLowerCase().includes(searchLower) ||
      client.type.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.firstName}</TableCell>
                  <TableCell>{client.lastName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${client.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${client.status === 'inactive' ? 'bg-gray-100 text-gray-800' : ''}
                      ${client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${client.status === 'suspended' ? 'bg-red-100 text-red-800' : ''}
                      ${client.status === 'archived' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                  </TableCell>
                  <TableCell>
                    {new Date(client.joinedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.location.href = `/admin/clients/${client.id}`
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this client?")) {
                            setClients(clients.filter(c => c.id !== client.id))
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddClientDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddClient}
      />
    </div>
  )
}
