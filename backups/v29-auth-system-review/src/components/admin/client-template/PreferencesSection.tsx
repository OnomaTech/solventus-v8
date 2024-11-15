import { TemplateField, TemplateSection } from '../../../types/clientTemplate'
import { LayoutBuilder } from './LayoutBuilder'

interface PreferencesSectionProps {
  section: TemplateSection
  onSectionChange: (section: TemplateSection) => void
  availableFields?: TemplateField[]
}

export function PreferencesSection({
  section,
  onSectionChange,
  availableFields = []
}: PreferencesSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preferences</h2>
      <LayoutBuilder
        section={section}
        onSectionChange={onSectionChange}
        availableFields={availableFields}
      />
    </div>
  )
}
