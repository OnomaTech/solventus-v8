import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { ClientTemplate } from '../../../types/clientTemplate'
import { Card } from '../../ui/card'

interface ClientTemplateViewProps {
  template: ClientTemplate
  data: Record<string, any>
  onDataChange?: (data: Record<string, any>) => void
  readOnly?: boolean
}

export function ClientTemplateView({
  template,
  data,
  onDataChange,
  readOnly = false
}: ClientTemplateViewProps) {
  const [activeTab, setActiveTab] = useState(template.tabs[0]?.id || '')

  const handleFieldChange = (fieldId: string, value: any) => {
    if (readOnly || !onDataChange) return
    onDataChange({
      ...data,
      [fieldId]: value
    })
  }

  const renderField = (field: any) => {
    const value = data[field.id] || field.defaultValue
    const isDisabled = readOnly || field.disabled

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            disabled={isDisabled}
            className="w-full p-2 border rounded"
            placeholder={field.placeholder}
          />
        )
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            disabled={isDisabled}
            className="w-full p-2 border rounded"
            placeholder={field.placeholder}
            rows={4}
          />
        )
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            disabled={isDisabled}
            className="w-full p-2 border rounded"
          >
            <option value="">Select...</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={e => handleFieldChange(field.id, e.target.checked)}
            disabled={isDisabled}
            className="h-4 w-4"
          />
        )
      default:
        return <div>Unsupported field type: {field.type}</div>
    }
  }

  const renderSection = (section: any) => (
    <Card key={section.id} className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">{section.label}</h3>
      {section.description && (
        <p className="text-sm text-muted-foreground">{section.description}</p>
      )}
      <div className="grid gap-4">
        {section.fields.map((field: any) => (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {renderField(field)}
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      {template.basicInfo?.sections.map(renderSection)}

      {/* Preferences Section */}
      {template.preferences?.sections.map(renderSection)}

      {/* Custom Tabs */}
      {template.tabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {template.tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {template.tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="space-y-4">
                {tab.sections.map(renderSection)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
