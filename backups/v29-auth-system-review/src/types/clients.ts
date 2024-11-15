export type ClientType = 'individual' | 'business' | 'non-profit'
export type ClientStatus = 'active' | 'inactive' | 'pending'
export type CommunicationPreference = 'email' | 'phone' | 'sms'

export interface ClientActivity {
  id: string
  description: string
  performedBy: string
  timestamp: string
}

export interface ClientPreferences {
  communicationPreferences: CommunicationPreference[]
  language: string
  timezone: string
  marketingOptIn: boolean
}

export interface ClientMetadata {
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  version: number
}

export interface ClientDocument {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
  uploadedBy: string
}

export interface ClientNote {
  id: string
  content: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}

export interface Client {
  id: string
  type: ClientType
  status: ClientStatus
  firstName: string
  lastName: string
  companyName?: string
  email: string
  phone: string
  joinedAt: string
  preferences: ClientPreferences
  documents: ClientDocument[]
  notes: ClientNote[]
  activities: ClientActivity[]
  tags: string[]
  metadata: ClientMetadata
  templateId?: string
  templateData?: Record<string, any>
}

export type ClientFormData = Partial<Client>
