import { NextApiRequest, NextApiResponse } from 'next'
import { createClient, getClients } from '../../../services/clients'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const clients = await getClients()
        return res.status(200).json(clients)

      case 'POST':
        const newClient = await createClient(req.body)
        return res.status(201).json(newClient)

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    })
  }
}
