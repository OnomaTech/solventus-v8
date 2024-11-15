import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { ClientTemplate } from '../../../types/clientTemplate'
import { useTemplateStorage } from '../../../hooks/useTemplateStorage'
import { ClientTemplateView } from '../client-template/ClientTemplateView'
import { Select } from '../../ui/select'

interface ClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
  mode?: 'create' | 'edit'
}

export function ClientDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'create'
}: ClientDialogProps) {
  const { templates } = useTemplateStorage()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialData?.templateId || templates[0]?.id || ''
  )
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {})

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      templateId: selectedTemplateId,
      templateVersion: selectedTemplate?.version
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Client' : 'Edit Client'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {mode === 'create' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <Select
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {selectedTemplate && (
            <ClientTemplateView
              template={selectedTemplate}
              data={formData}
              onDataChange={setFormData}
            />
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {mode === 'create' ? 'Create Client' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
