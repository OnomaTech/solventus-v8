import { Client } from '../types/clients'
import { mockClients } from '../services/clients/mockData'

type Subscriber = () => void

class Store {
  private clients: Client[] = []
  private subscribers: Set<Subscriber> = new Set()

  constructor() {
    console.log('Initializing store with mock data...')
    this.clients = [...mockClients]
  }

  subscribe(callback: Subscriber): () => void {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notify() {
    this.subscribers.forEach(callback => callback())
  }

  getClients(): Client[] {
    return this.clients
  }

  getClient(id: string): Client | undefined {
    return this.clients.find(client => client.id === id)
  }

  addClient(client: Client): Client {
    this.clients.push(client)
    this.notify()
    return client
  }

  updateClient(id: string, updates: Partial<Client>): Client {
    const index = this.clients.findIndex(client => client.id === id)
    if (index === -1) {
      throw new Error('Client not found')
    }

    this.clients[index] = { ...this.clients[index], ...updates }
    this.notify()
    return this.clients[index]
  }

  deleteClient(id: string): void {
    const initialLength = this.clients.length
    this.clients = this.clients.filter(client => client.id !== id)
    if (this.clients.length === initialLength) {
      throw new Error('Client not found')
    }
    this.notify()
  }

  // Debug methods
  _debug() {
    console.log('Current store state:')
    console.log('Clients:', this.clients)
    console.log('Subscribers:', this.subscribers.size)
  }
}

// Create a singleton instance
export const store = new Store()

// Initialize store with mock data if needed
if (typeof window !== 'undefined') {
  // Only run in browser environment
  console.log('Store initialized in browser environment')
  store._debug()
}
