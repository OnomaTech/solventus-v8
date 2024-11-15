"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Client } from "../../../types/clients"
import { useTemplateStorage } from "../../../hooks/useTemplateStorage"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet"

interface AddClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Client>) => void
}

export function AddClientDialog({
  isOpen,
  onClose,
  onSubmit
}: AddClientDialogProps) {
  const { templates } = useTemplateStorage()
  const [formData, setFormData] = useState<Partial<Client>>({
    type: 'individual',
    status: 'active',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    preferences: {
      communicationPreferences: ['email'],
      language: 'en',
      timezone: 'America/New_York',
      marketingOptIn: true
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get the selected template
    const selectedTemplate = templates.find(t => t.id === formData.templateId)

    // Initialize template data if a template is selected
    const templateData = selectedTemplate ? {
      basicInfo: {},
      preferences: {},
      tabs: selectedTemplate.tabs.map(tab => ({
        id: tab.id,
        name: tab.name,
        data: {}
      }))
    } : undefined

    onSubmit({
      ...formData,
      joinedAt: new Date().toISOString(),
      documents: [],
      notes: [],
      activities: [],
      tags: [],
      templateData,
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: 'system',
        updatedAt: new Date().toISOString(),
        updatedBy: 'system',
        version: 1
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Add New Client</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pr-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Client['type']) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="non-profit">Non-Profit</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Client['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Profile Template</Label>
            <Select
              value={formData.templateId}
              onValueChange={(value: string) =>
                setFormData({ ...formData, templateId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          {formData.type !== 'individual' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-6">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Add Client
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
