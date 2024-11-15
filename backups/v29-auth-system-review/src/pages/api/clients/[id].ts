import { NextApiRequest, NextApiResponse } from 'next'
import { getClient, updateClient, deleteClient } from '../../../services/clients'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid client ID' })
    }

    switch (req.method) {
      case 'GET':
        const client = await getClient(id)
        return res.status(200).json(client)

      case 'PUT':
        const updatedClient = await updateClient(id, req.body)
        return res.status(200).json(updatedClient)

      case 'DELETE':
        await deleteClient(id)
        return res.status(200).json({ success: true })

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    if (error instanceof Error && error.message === 'Client not found') {
      return res.status(404).json({ error: 'Client not found' })
    }
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    })
  }
}
