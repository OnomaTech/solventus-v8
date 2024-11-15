export type ClientType = 'individual' | 'business' | 'non-profit' | 'government'
export type ClientStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'archived'

export type Client = {
  id: string
  firstName: string
  lastName: string
  companyName?: string
  email: string
  phone: string
  type: ClientType
  status: ClientStatus
  joinedAt: string
  preferences: {
    communicationPreferences: string[]
    language: string
    timezone: string
    marketingOptIn: boolean
  }
  contacts: Array<{
    name: string
    role: string
    email: string
    phone: string
    primary: boolean
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    uploadedAt: string
  }>
  notes: Array<{
    id: string
    content: string
    createdAt: string
    createdBy: string
  }>
  activities: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    performedBy: string
  }>
  tags: string[]
  metadata: {
    createdAt: string
    createdBy: string
    updatedAt: string
    updatedBy: string
    version: number
  }
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    type: "individual",
    status: "active",
    joinedAt: "2024-01-01T00:00:00Z",
    preferences: {
      communicationPreferences: ["email"],
      language: "en",
      timezone: "America/New_York",
      marketingOptIn: true
    },
    contacts: [],
    documents: [],
    notes: [],
    activities: [],
    tags: ["new"],
    metadata: {
      createdAt: "2024-01-01T00:00:00Z",
      createdBy: "system",
      updatedAt: "2024-01-01T00:00:00Z",
      updatedBy: "system",
      version: 1
    }
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    companyName: "Tech Corp",
    email: "jane.smith@techcorp.com",
    phone: "987-654-3210",
    type: "business",
    status: "active",
    joinedAt: "2024-01-02T00:00:00Z",
    preferences: {
      communicationPreferences: ["email", "phone"],
      language: "en",
      timezone: "America/Los_Angeles",
      marketingOptIn: true
    },
    contacts: [],
    documents: [],
    notes: [],
    activities: [],
    tags: ["business", "tech"],
    metadata: {
      createdAt: "2024-01-02T00:00:00Z",
      createdBy: "system",
      updatedAt: "2024-01-02T00:00:00Z",
      updatedBy: "system",
      version: 1
    }
  }
]
