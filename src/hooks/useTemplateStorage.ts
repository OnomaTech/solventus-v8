import { useState, useEffect } from 'react'
import { ClientTemplate } from '../types/clientTemplate'

const STORAGE_KEY = 'client-templates'

const defaultTemplate: ClientTemplate = {
  id: 'default',
  name: 'Default Template',
  description: 'Default client template',
  tabs: [],
  basicInfo: {
    sections: []
  },
  preferences: {
    sections: []
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
  isDefault: true
}

export function useTemplateStorage() {
  const [templates, setTemplates] = useState<ClientTemplate[]>([])

  useEffect(() => {
    // Load templates from localStorage
    const loadTemplates = () => {
      try {
        const storedTemplates = localStorage.getItem(STORAGE_KEY)
        if (storedTemplates) {
          setTemplates(JSON.parse(storedTemplates))
        } else {
          // Initialize with default template if no templates exist
          setTemplates([defaultTemplate])
          localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultTemplate]))
        }
      } catch (error) {
        console.error('Error loading templates:', error)
        setTemplates([defaultTemplate])
      }
    }

    loadTemplates()
  }, [])

  const updateTemplates = (newTemplates: ClientTemplate[]) => {
    try {
      setTemplates(newTemplates)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates))
    } catch (error) {
      console.error('Error saving templates:', error)
    }
  }

  const addTemplate = (template: ClientTemplate) => {
    updateTemplates([...templates, template])
  }

  const updateTemplate = (templateId: string, updates: Partial<ClientTemplate>) => {
    const updatedTemplates = templates.map(template =>
      template.id === templateId
        ? { ...template, ...updates, updatedAt: new Date().toISOString() }
        : template
    )
    updateTemplates(updatedTemplates)
  }

  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId)
    updateTemplates(updatedTemplates)
  }

  return {
    templates,
    updateTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate
  }
}
