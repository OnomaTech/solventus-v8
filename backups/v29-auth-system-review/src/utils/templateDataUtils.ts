import { ClientTemplate } from '../types/clientTemplate'

export function initializeTemplateData(selectedTemplate: ClientTemplate | undefined) {
  if (!selectedTemplate) return undefined

  return {
    basicInfo: {
      fields: [],
      sections: [],
      layout: { columns: 2, order: [] }
    },
    preferences: {
      fields: [],
      sections: [],
      layout: { columns: 1, order: [] }
    },
    tabs: selectedTemplate.tabs.map(tab => ({
      id: tab.id,
      name: tab.name,
      sections: [],
      data: {}
    }))
  }
}
