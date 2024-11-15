"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Client } from "../../../types/clients"
import { useTemplateStorage } from "../../../hooks/useTemplateStorage"
import { useClientForm } from "../../../hooks/useClientForm"
import { ClientFormStatus } from "./ClientFormStatus"
import { ClientFormFields } from "./ClientFormFields"
import { updateClient } from "../../../services/clients"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Client) => void
  client: Client
}

export function ClientDialog({ isOpen, onClose, onSubmit, client }: Props) {
  const { templates } = useTemplateStorage()
  const form = useClientForm({ initialData: client })
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.validateForm()) return

    try {
      form.setIsSubmitting(true)
      setError(null)

      const template = templates.find(t => t.id === form.formData.templateId)
      const updatedClient = await updateClient(client.id, {
        ...form.formData,
        templateId: template?.id,
        templateData: client.templateData
      })

      onSubmit(updatedClient)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update client')
    } finally {
      form.setIsSubmitting(false)
    }
  }

  // Cast updateField to match the expected type
  const updateField = (field: string, value: any) => {
    form.updateField(field as any, value)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Edit Client</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pr-6">
          <ClientFormFields
            formData={form.formData}
            errors={form.errors}
            updateField={updateField}
            templates={templates}
          />

          <ClientFormStatus
            isLoading={form.isSubmitting}
            error={error}
            className="mt-4"
          />

          <div className="flex justify-end space-x-2 pt-6">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              disabled={form.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
