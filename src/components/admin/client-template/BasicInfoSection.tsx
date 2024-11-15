import { TemplateField, TemplateSection } from '../../../types/clientTemplate'
import { LayoutBuilder } from './LayoutBuilder'

interface BasicInfoSectionProps {
  section: TemplateSection
  onSectionChange: (section: TemplateSection) => void
  availableFields?: TemplateField[]
}

export function BasicInfoSection({
  section,
  onSectionChange,
  availableFields = []
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Basic Information</h2>
      <LayoutBuilder
        section={section}
        onSectionChange={onSectionChange}
        availableFields={availableFields}
      />
    </div>
  )
}
