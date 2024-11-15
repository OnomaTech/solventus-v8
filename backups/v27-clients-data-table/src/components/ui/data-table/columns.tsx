"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Client } from "../../../types/clients"
import { Badge } from "../badge"
import { Button } from "../button"
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../dropdown-menu"
import { EditableCell } from "./editable-cell"
import { store } from "../../../lib/store"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const client = row.original
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <EditableCell
              value={client.firstName}
              row={row}
              column={{ id: 'firstName' }}
              onUpdate={(value) => store.updateClient(client.id, { firstName: value })}
            />
            <EditableCell
              value={client.lastName}
              row={row}
              column={{ id: 'lastName' }}
              onUpdate={(value) => store.updateClient(client.id, { lastName: value })}
            />
          </div>
          {client.companyName && (
            <EditableCell
              value={client.companyName}
              row={row}
              column={{ id: 'companyName' }}
              onUpdate={(value) => store.updateClient(client.id, { companyName: value })}
            />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <EditableCell
          value={row.getValue("email")}
          row={row}
          column={{ id: 'email' }}
          onUpdate={(value) => store.updateClient(row.original.id, { email: value })}
        />
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <EditableCell
          value={row.getValue("phone")}
          row={row}
          column={{ id: 'phone' }}
          onUpdate={(value) => store.updateClient(row.original.id, { phone: value })}
        />
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const client = row.original
      const types = ['individual', 'business', 'non-profit'] as const

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 capitalize">
              <Badge variant="secondary">
                {client.type}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={client.type}
              onValueChange={(value) => 
                store.updateClient(client.id, { type: value as typeof types[number] })
              }
            >
              {types.map((type) => (
                <DropdownMenuRadioItem key={type} value={type} className="capitalize">
                  {type}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const client = row.original
      const statuses = ['active', 'inactive', 'pending'] as const

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 capitalize">
              <Badge variant="outline" className={
                client.status === 'active' ? 'bg-green-100 text-green-800' :
                client.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }>
                {client.status}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={client.status}
              onValueChange={(value) => 
                store.updateClient(client.id, { status: value as typeof statuses[number] })
              }
            >
              {statuses.map((status) => (
                <DropdownMenuRadioItem key={status} value={status} className="capitalize">
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "joinedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return new Date(row.getValue("joinedAt")).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/clients/${client.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.id)}
              >
                Copy client ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => store.deleteClient(client.id)}
                className="text-destructive"
              >
                Delete client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
