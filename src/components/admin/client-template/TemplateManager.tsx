import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { ClientTemplate } from '../../../types/clientTemplate'
import { ClientTemplateEditor } from '.'

interface TemplateManagerProps {
  templates: ClientTemplate[]
  onTemplatesChange: (templates: ClientTemplate[]) => void
}

export function TemplateManager({
  templates,
  onTemplatesChange
}: TemplateManagerProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [isAddingTemplate, setIsAddingTemplate] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState('')

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)

  const handleAddTemplate = () => {
    if (!newTemplateName.trim()) return

    const newTemplate: ClientTemplate = {
      id: crypto.randomUUID(),
      name: newTemplateName.trim(),
      description: '',
      tabs: [],
      basicInfo: {
        sections: []
      },
      preferences: {
        sections: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    }

    onTemplatesChange([...templates, newTemplate])
    setNewTemplateName('')
    setIsAddingTemplate(false)
    setSelectedTemplateId(newTemplate.id)
  }

  const handleTemplateChange = (templateId: string, updates: Partial<ClientTemplate>) => {
    const updatedTemplates = templates.map(template =>
      template.id === templateId
        ? { ...template, ...updates, updatedAt: new Date().toISOString() }
        : template
    )
    onTemplatesChange(updatedTemplates)
  }

  const handleDeleteTemplate = (templateId: string) => {
    onTemplatesChange(templates.filter(t => t.id !== templateId))
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Client Templates</h2>
        <Button onClick={() => setIsAddingTemplate(true)}>Add Template</Button>
      </div>

      {isAddingTemplate && (
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Template Name"
            value={newTemplateName}
            onChange={e => setNewTemplateName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTemplate()
              if (e.key === 'Escape') {
                setNewTemplateName('')
                setIsAddingTemplate(false)
              }
            }}
          />
          <Button onClick={handleAddTemplate}>Add</Button>
          <Button
            variant="outline"
            onClick={() => {
              setNewTemplateName('')
              setIsAddingTemplate(false)
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {templates.map(template => (
          <div
            key={template.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedTemplateId === template.id ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedTemplateId(template.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{template.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  handleDeleteTemplate(template.id)
                }}
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {template.description || 'No description'}
            </p>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <ClientTemplateEditor
          template={selectedTemplate}
          onTemplateChange={updates => handleTemplateChange(selectedTemplate.id, updates)}
        />
      )}
    </div>
  )
}
