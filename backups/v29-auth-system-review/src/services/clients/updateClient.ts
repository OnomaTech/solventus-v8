import { Client } from '../../types/clients'
import { validateTemplateData } from '../../utils/templateValidation'
import { store } from '../../lib/store'

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client> {
  const existingClient = store.getClient(id)
  if (!existingClient) {
    throw new Error('Client not found')
  }

  if (updates.templateData) {
    const validation = validateTemplateData(updates.templateData)
    if (!validation.isValid) {
      throw new Error(`Invalid template data: ${validation.errors.join(', ')}`)
    }
  }

  const now = new Date().toISOString()
  const updateData: Partial<Client> = {
    ...updates,
    metadata: {
      createdAt: existingClient.metadata?.createdAt || now,
      createdBy: existingClient.metadata?.createdBy || 'system',
      updatedAt: now,
      updatedBy: 'system',
      version: (existingClient.metadata?.version || 0) + 1
    }
  }

  // Add template change activity if needed
  if (updates.templateId !== existingClient.templateId) {
    updateData.activities = [
      ...(existingClient.activities || []),
      {
        id: `activity-${Date.now()}`,
        description: updates.templateId 
          ? `Template changed to ${updates.templateId}`
          : 'Template removed',
        performedBy: 'system',
        timestamp: now
      }
    ]
  }

  return store.updateClient(id, updateData)
}
