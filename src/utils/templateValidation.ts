import { ClientTemplate } from '../types/clientTemplate'

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateTemplateData(data: any): ValidationResult {
  const errors: string[] = []

  if (!data) {
    errors.push('Template data is required')
    return { isValid: false, errors }
  }

  // Validate basic info section
  if (!data.basicInfo) {
    errors.push('Basic info section is required')
  } else {
    if (!Array.isArray(data.basicInfo.fields)) {
      errors.push('Basic info fields must be an array')
    }
    if (!Array.isArray(data.basicInfo.sections)) {
      errors.push('Basic info sections must be an array')
    }
    if (!data.basicInfo.layout || typeof data.basicInfo.layout !== 'object') {
      errors.push('Basic info layout is required and must be an object')
    }
  }

  // Validate preferences section
  if (!data.preferences) {
    errors.push('Preferences section is required')
  } else {
    if (!Array.isArray(data.preferences.fields)) {
      errors.push('Preferences fields must be an array')
    }
    if (!Array.isArray(data.preferences.sections)) {
      errors.push('Preferences sections must be an array')
    }
    if (!data.preferences.layout || typeof data.preferences.layout !== 'object') {
      errors.push('Preferences layout is required and must be an object')
    }
  }

  // Validate tabs
  if (!Array.isArray(data.tabs)) {
    errors.push('Tabs must be an array')
  } else {
    data.tabs.forEach((tab: any, index: number) => {
      if (!tab.id) {
        errors.push(`Tab ${index} must have an id`)
      }
      if (!tab.name) {
        errors.push(`Tab ${index} must have a name`)
      }
      if (!Array.isArray(tab.sections)) {
        errors.push(`Tab ${index} sections must be an array`)
      }
      if (typeof tab.data !== 'object') {
        errors.push(`Tab ${index} data must be an object`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function initializeTemplateData(template: ClientTemplate) {
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
    tabs: template.tabs.map(tab => ({
      id: tab.id,
      name: tab.name,
      sections: [],
      data: {}
    }))
  }
}
