import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { TemplateField, TemplateSection } from '../../../types/clientTemplate'
import { FieldManager } from './FieldManager'

interface LayoutBuilderProps {
  section: TemplateSection
  onSectionChange: (section: TemplateSection) => void
  availableFields?: TemplateField[]
}

export function LayoutBuilder({
  section,
  onSectionChange,
  availableFields = []
}: LayoutBuilderProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleSectionChange = (updates: Partial<TemplateSection>) => {
    onSectionChange({
      ...section,
      ...updates
    })
  }

  const handleFieldsChange = (fields: TemplateField[]) => {
    handleSectionChange({ fields })
  }

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Input
            placeholder="Section Name"
            value={section.name}
            onChange={e => handleSectionChange({ name: e.target.value })}
          />
          <Input
            placeholder="Section Label"
            value={section.label}
            onChange={e => handleSectionChange({ label: e.target.value })}
          />
          <Input
            placeholder="Section Description"
            value={section.description || ''}
            onChange={e => handleSectionChange({ description: e.target.value })}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Done' : 'Edit Fields'}
        </Button>
      </div>

      {isEditing && (
        <FieldManager
          fields={section.fields}
          onFieldsChange={handleFieldsChange}
          availableFields={availableFields}
        />
      )}
    </div>
  )
}
