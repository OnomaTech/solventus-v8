import { Client } from '../../types/clients'
import { store } from '../../lib/store'

export async function getClients(): Promise<Client[]> {
  try {
    return store.getClients()
  } catch (error) {
    console.error('Error getting clients:', error)
    throw error
  }
}

export async function getClient(id: string): Promise<Client> {
  try {
    const client = store.getClient(id)
    if (!client) {
      throw new Error('Client not found')
    }
    return client
  } catch (error) {
    console.error('Error getting client:', error)
    throw error
  }
}
