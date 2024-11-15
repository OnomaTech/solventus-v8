import { useState } from 'react'
import { ClientTemplate, TemplateTab } from '../../../types/clientTemplate'
import { TabManager } from './TabManager'
import { OverviewContent } from './OverviewContent'

interface ClientTemplateEditorProps {
  template: ClientTemplate
  onTemplateChange: (template: ClientTemplate) => void
}

export function ClientTemplateEditor({
  template,
  onTemplateChange
}: ClientTemplateEditorProps) {
  const [selectedTabId, setSelectedTabId] = useState(template.tabs[0]?.id || '')

  const handleTemplateChange = (updates: Partial<ClientTemplate>) => {
    onTemplateChange({
      ...template,
      ...updates
    })
  }

  const handleTabsChange = (tabs: TemplateTab[]) => {
    handleTemplateChange({ tabs })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Template Editor</h1>
        <p className="text-muted-foreground">
          Configure the client template structure and fields
        </p>
      </div>

      <div className="space-y-6">
        <OverviewContent
          template={template}
          onUpdate={handleTemplateChange}
        />

        <TabManager
          tabs={template.tabs}
          onTabsChange={handleTabsChange}
          selectedTabId={selectedTabId}
          onTabSelect={setSelectedTabId}
        >
          {/* Tab content will go here */}
        </TabManager>
      </div>
    </div>
  )
}
