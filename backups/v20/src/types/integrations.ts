export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending'

export interface IntegrationConfig {
  clientId?: string
  clientSecret?: string
  apiKey?: string
  webhookUrl?: string
  customFields?: Record<string, string>
}

export interface Integration {
  id: string
  name: string
  description: string
  type: 'payment' | 'email' | 'crm' | 'calendar' | 'storage'
  provider: string
  icon: string
  status: IntegrationStatus
  lastSync?: string
  config?: IntegrationConfig
  features: string[]
  requiredScopes: string[]
  webhookSupport: boolean
  apiDocs: string
}

// Mock integrations data
export const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and subscription management',
    type: 'payment',
    provider: 'Stripe',
    icon: '/images/integrations/stripe.svg',
    status: 'disconnected',
    features: [
      'Payment processing',
      'Subscription management',
      'Invoice generation',
      'Payment analytics'
    ],
    requiredScopes: [
      'payment_intents',
      'subscriptions',
      'customers',
      'invoices'
    ],
    webhookSupport: true,
    apiDocs: 'https://stripe.com/docs/api'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation',
    type: 'email',
    provider: 'Mailchimp',
    icon: '/images/integrations/mailchimp.svg',
    status: 'disconnected',
    features: [
      'Email campaigns',
      'Subscriber management',
      'Email automation',
      'Analytics'
    ],
    requiredScopes: [
      'lists:read',
      'lists:write',
      'campaigns:read',
      'campaigns:write'
    ],
    webhookSupport: true,
    apiDocs: 'https://mailchimp.com/developer/'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Customer relationship management',
    type: 'crm',
    provider: 'Salesforce',
    icon: '/images/integrations/salesforce.svg',
    status: 'disconnected',
    features: [
      'Contact management',
      'Lead tracking',
      'Opportunity management',
      'Reports and dashboards'
    ],
    requiredScopes: [
      'api',
      'refresh_token',
      'offline_access',
      'web'
    ],
    webhookSupport: true,
    apiDocs: 'https://developer.salesforce.com/docs'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Calendar and scheduling integration',
    type: 'calendar',
    provider: 'Google',
    icon: '/images/integrations/google-calendar.svg',
    status: 'disconnected',
    features: [
      'Event scheduling',
      'Calendar sync',
      'Appointment management',
      'Availability checking'
    ],
    requiredScopes: [
      'calendar.events',
      'calendar.settings.readonly',
      'calendar.readonly',
      'calendar.events.readonly'
    ],
    webhookSupport: true,
    apiDocs: 'https://developers.google.com/calendar'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Cloud storage and file sharing',
    type: 'storage',
    provider: 'Dropbox',
    icon: '/images/integrations/dropbox.svg',
    status: 'disconnected',
    features: [
      'File storage',
      'File sharing',
      'Document collaboration',
      'Backup'
    ],
    requiredScopes: [
      'files.content.read',
      'files.content.write',
      'sharing.read',
      'sharing.write'
    ],
    webhookSupport: true,
    apiDocs: 'https://www.dropbox.com/developers/documentation'
  }
]

export interface IntegrationEvent {
  id: string
  integrationId: string
  type: 'connection' | 'sync' | 'error' | 'webhook'
  status: 'success' | 'failure' | 'pending'
  message: string
  timestamp: string
  details?: Record<string, any>
}

// Mock integration events
export const MOCK_EVENTS: IntegrationEvent[] = [
  {
    id: '1',
    integrationId: 'stripe',
    type: 'connection',
    status: 'success',
    message: 'Successfully connected to Stripe',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    integrationId: 'mailchimp',
    type: 'sync',
    status: 'failure',
    message: 'Failed to sync subscriber list',
    timestamp: '2024-01-14T15:45:00Z',
    details: {
      error: 'API rate limit exceeded',
      code: 429
    }
  }
]

export interface IntegrationStats {
  totalIntegrations: number
  activeIntegrations: number
  failedIntegrations: number
  lastSyncTime?: string
  syncStatus: 'idle' | 'syncing' | 'error'
  eventsToday: number
  errorRate: number
}

// Mock integration statistics
export const MOCK_STATS: IntegrationStats = {
  totalIntegrations: 5,
  activeIntegrations: 2,
  failedIntegrations: 1,
  lastSyncTime: '2024-01-15T12:00:00Z',
  syncStatus: 'idle',
  eventsToday: 145,
  errorRate: 0.02
}
