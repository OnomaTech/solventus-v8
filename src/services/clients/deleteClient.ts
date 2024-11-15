import { store } from '../../lib/store'

export async function deleteClient(id: string): Promise<void> {
  try {
    const client = store.getClient(id)
    if (!client) {
      throw new Error('Client not found')
    }
    store.deleteClient(id)
  } catch (error) {
    console.error('Error deleting client:', error)
    throw error
  }
}
