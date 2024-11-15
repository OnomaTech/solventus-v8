import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { ClientTemplate, TemplateField, TemplateSection } from '../../../types/clientTemplate'
import { BasicInfoSection } from './BasicInfoSection'
import { PreferencesSection } from './PreferencesSection'

interface OverviewContentProps {
  template: ClientTemplate
  onUpdate: (updates: Partial<ClientTemplate>) => void
}

export function OverviewContent({ template, onUpdate }: OverviewContentProps) {
  const [activeTab, setActiveTab] = useState('basic-info')

  const handleBasicInfoChange = (section: TemplateSection) => {
    onUpdate({
      basicInfo: {
        sections: [section]
      }
    })
  }

  const handlePreferencesChange = (section: TemplateSection) => {
    onUpdate({
      preferences: {
        sections: [section]
      }
    })
  }

  // Create default sections if they don't exist
  const basicInfoSection: TemplateSection = template.basicInfo?.sections[0] || {
    id: crypto.randomUUID(),
    name: 'Basic Information',
    label: 'Basic Information',
    description: 'Basic client information',
    fields: [],
    order: 0
  }

  const preferencesSection: TemplateSection = template.preferences?.sections[0] || {
    id: crypto.randomUUID(),
    name: 'Preferences',
    label: 'Preferences',
    description: 'Client preferences and settings',
    fields: [],
    order: 0
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="basic-info">
        <BasicInfoSection
          section={basicInfoSection}
          onSectionChange={handleBasicInfoChange}
          availableFields={[]}
        />
      </TabsContent>

      <TabsContent value="preferences">
        <PreferencesSection
          section={preferencesSection}
          onSectionChange={handlePreferencesChange}
          availableFields={[]}
        />
      </TabsContent>
    </Tabs>
  )
}
