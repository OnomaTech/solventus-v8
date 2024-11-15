import { Client } from '../../types/clients'
import { validateTemplateData } from '../../utils/templateValidation'
import { store } from '../../lib/store'

export async function createClient(data: Partial<Client>): Promise<Client> {
  try {
    console.log('Creating client with data:', data)

    // Validate template data if present
    if (data.templateId && data.templateData) {
      const validation = validateTemplateData(data.templateData)
      if (!validation.isValid) {
        console.error('Template data validation failed:', validation.errors)
        throw new Error(`Invalid template data: ${validation.errors.join(', ')}`)
      }
    }

    const now = new Date().toISOString()
    const newClient: Client = {
      id: `client-${Date.now()}`,
      type: data.type || 'individual',
      status: data.status || 'active',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      companyName: data.companyName || '',
      email: data.email || '',
      phone: data.phone || '',
      joinedAt: now,
      preferences: {
        communicationPreferences: ['email'],
        language: 'en',
        timezone: 'America/New_York',
        marketingOptIn: true,
        ...data.preferences
      },
      templateId: data.templateId,
      templateData: data.templateData,
      documents: [],
      notes: [],
      activities: [{
        id: `activity-${Date.now()}`,
        description: 'Client created',
        performedBy: 'system',
        timestamp: now
      }],
      tags: [],
      metadata: {
        createdAt: now,
        createdBy: 'system',
        updatedAt: now,
        updatedBy: 'system',
        version: 1
      }
    }

    const createdClient = store.addClient(newClient)
    console.log('Created client:', createdClient)
    return createdClient
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}
