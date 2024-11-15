import { useState, useEffect, useCallback } from 'react'
import { Client } from '../types/clients'
import { getClient, updateClient, deleteClient } from '../services/clients'

export function useClientDetails(id: string | undefined) {
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadClient = useCallback(async () => {
    if (!id) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await getClient(id)
      setClient(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load client')
      setClient(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadClient()
  }, [loadClient])

  const updateClientDetails = async (updates: Partial<Client>) => {
    if (!id || !client) {
      throw new Error('No client to update')
    }

    try {
      setError(null)
      const updatedClient = await updateClient(id, updates)
      setClient(updatedClient)
      return updatedClient
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update client'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const removeClient = async () => {
    if (!id) {
      throw new Error('No client to delete')
    }

    try {
      setError(null)
      await deleteClient(id)
      setClient(null)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete client'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    client,
    isLoading,
    error,
    updateClient: updateClientDetails,
    deleteClient: removeClient,
    refreshClient: loadClient
  }
}
