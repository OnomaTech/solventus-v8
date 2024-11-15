import { useState, useEffect, useCallback } from 'react'
import { Client } from '../types/clients'
import { getClients, createClient, updateClient, deleteClient } from '../services/clients'
import { store } from '../lib/store'

export function useClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadClients = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = store.getClients()
      setClients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const addClient = useCallback(async (data: Partial<Client>) => {
    try {
      setError(null)
      const newClient = await createClient(data)
      setClients(prev => [...prev, newClient])
      return newClient
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create client'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  const updateClientData = useCallback(async (id: string, updates: Partial<Client>) => {
    try {
      setError(null)
      const updatedClient = await updateClient(id, updates)
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ))
      return updatedClient
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update client'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  const removeClient = useCallback(async (id: string) => {
    try {
      setError(null)
      await deleteClient(id)
      setClients(prev => prev.filter(client => client.id !== id))
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete client'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [])

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      loadClients()
    })

    return () => {
      unsubscribe()
    }
  }, [loadClients])

  return {
    clients,
    isLoading,
    error,
    addClient,
    updateClient: updateClientData,
    removeClient,
    refreshClients: loadClients
  }
}
