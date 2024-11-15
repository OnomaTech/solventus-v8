"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Client } from "../../../types/clients"
import { Badge } from "../badge"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.type.charAt(0).toUpperCase() + row.original.type.slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      let variant: "default" | "outline" | "secondary" | "destructive" = "default"

      switch (status) {
        case "active":
          variant = "default"
          break
        case "inactive":
          variant = "secondary"
          break
        case "pending":
          variant = "outline"
          break
        default:
          variant = "destructive"
      }

      return (
        <Badge variant={variant}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
]
