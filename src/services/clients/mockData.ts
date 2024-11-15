import { Client } from '../../types/clients'

const now = new Date().toISOString()
const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

export const mockClients: Client[] = [
  {
    id: 'client-1',
    type: 'individual',
    status: 'active',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    joinedAt: now,
    preferences: {
      communicationPreferences: ['email'],
      language: 'en',
      timezone: 'America/New_York',
      marketingOptIn: true
    },
    documents: [],
    notes: [],
    activities: [{
      id: 'activity-1',
      description: 'Client created',
      performedBy: 'system',
      timestamp: now
    }],
    tags: ['new'],
    metadata: {
      createdAt: now,
      createdBy: 'system',
      updatedAt: now,
      updatedBy: 'system',
      version: 1
    }
  },
  {
    id: 'client-2',
    type: 'business',
    status: 'active',
    firstName: 'Sarah',
    lastName: 'Johnson',
    companyName: 'Tech Solutions Inc',
    email: 'sarah@techsolutions.com',
    phone: '(555) 987-6543',
    joinedAt: oneWeekAgo,
    preferences: {
      communicationPreferences: ['email', 'phone'],
      language: 'en',
      timezone: 'America/Los_Angeles',
      marketingOptIn: true
    },
    documents: [],
    notes: [],
    activities: [{
      id: 'activity-2',
      description: 'Client created',
      performedBy: 'system',
      timestamp: oneWeekAgo
    }],
    tags: ['business', 'tech'],
    metadata: {
      createdAt: oneWeekAgo,
      createdBy: 'system',
      updatedAt: oneWeekAgo,
      updatedBy: 'system',
      version: 1
    }
  },
  {
    id: 'client-3',
    type: 'non-profit',
    status: 'pending',
    firstName: 'Michael',
    lastName: 'Brown',
    companyName: 'Community Foundation',
    email: 'michael@communityfoundation.org',
    phone: '(555) 456-7890',
    joinedAt: oneMonthAgo,
    preferences: {
      communicationPreferences: ['email'],
      language: 'en',
      timezone: 'America/Chicago',
      marketingOptIn: false
    },
    documents: [],
    notes: [],
    activities: [{
      id: 'activity-3',
      description: 'Client created',
      performedBy: 'system',
      timestamp: oneMonthAgo
    }],
    tags: ['non-profit'],
    metadata: {
      createdAt: oneMonthAgo,
      createdBy: 'system',
      updatedAt: oneMonthAgo,
      updatedBy: 'system',
      version: 1
    }
  },
  {
    id: 'client-4',
    type: 'business',
    status: 'inactive',
    firstName: 'David',
    lastName: 'Wilson',
    companyName: 'Wilson Consulting',
    email: 'david@wilsonconsulting.com',
    phone: '(555) 789-0123',
    joinedAt: oneMonthAgo,
    preferences: {
      communicationPreferences: ['email', 'phone'],
      language: 'en',
      timezone: 'America/Denver',
      marketingOptIn: true
    },
    documents: [],
    notes: [],
    activities: [{
      id: 'activity-4',
      description: 'Client created',
      performedBy: 'system',
      timestamp: oneMonthAgo
    }],
    tags: ['business', 'consulting'],
    metadata: {
      createdAt: oneMonthAgo,
      createdBy: 'system',
      updatedAt: oneMonthAgo,
      updatedBy: 'system',
      version: 1
    }
  },
  {
    id: 'client-5',
    type: 'individual',
    status: 'active',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@example.com',
    phone: '(555) 234-5678',
    joinedAt: oneWeekAgo,
    preferences: {
      communicationPreferences: ['email'],
      language: 'en',
      timezone: 'America/New_York',
      marketingOptIn: true
    },
    documents: [],
    notes: [],
    activities: [{
      id: 'activity-5',
      description: 'Client created',
      performedBy: 'system',
      timestamp: oneWeekAgo
    }],
    tags: ['premium'],
    metadata: {
      createdAt: oneWeekAgo,
      createdBy: 'system',
      updatedAt: oneWeekAgo,
      updatedBy: 'system',
      version: 1
    }
  }
]
