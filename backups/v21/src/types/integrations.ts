export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending'

export type IntegrationType = 
  | 'payment'
  | 'email'
  | 'crm'
  | 'calendar'
  | 'storage'
  | 'communication'
  | 'automation'
  | 'ai'
  | 'social'
  | 'development'
  | 'cloud'

export interface IntegrationConfig {
  clientId?: string
  clientSecret?: string
  apiKey?: string
  webhookUrl?: string
  organizationId?: string
  workspace?: string
  model?: string
  customFields?: Record<string, string>
}

export interface Integration {
  id: string
  name: string
  description: string
  type: IntegrationType
  provider: string
  icon: string
  status: IntegrationStatus
  lastSync?: string
  config?: IntegrationConfig
  features: string[]
  requiredScopes: string[]
  webhookSupport: boolean
  apiDocs: string
  healthCheck?: {
    lastCheck: string
    status: 'healthy' | 'degraded' | 'down'
    responseTime?: number
    errors?: string[]
  }
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
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration',
    type: 'communication',
    provider: 'Slack',
    icon: '/images/integrations/slack.svg',
    status: 'disconnected',
    features: [
      'Channel messaging',
      'Direct messaging',
      'File sharing',
      'Notifications'
    ],
    requiredScopes: [
      'chat:write',
      'channels:read',
      'files:write',
      'users:read'
    ],
    webhookSupport: true,
    apiDocs: 'https://api.slack.com/docs'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Database and spreadsheet collaboration',
    type: 'automation',
    provider: 'Airtable',
    icon: '/images/integrations/airtable.svg',
    status: 'disconnected',
    features: [
      'Database management',
      'Record creation',
      'Data synchronization',
      'Automated workflows'
    ],
    requiredScopes: [
      'data.records:read',
      'data.records:write',
      'schema.bases:read'
    ],
    webhookSupport: true,
    apiDocs: 'https://airtable.com/developers/web/api'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code repository and version control',
    type: 'development',
    provider: 'GitHub',
    icon: '/images/integrations/github.svg',
    status: 'disconnected',
    features: [
      'Repository access',
      'Issue tracking',
      'Pull requests',
      'Webhook events'
    ],
    requiredScopes: [
      'repo',
      'workflow',
      'admin:org',
      'notifications'
    ],
    webhookSupport: true,
    apiDocs: 'https://docs.github.com/rest'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    description: 'Social media platform integration',
    type: 'social',
    provider: 'X',
    icon: '/images/integrations/twitter.svg',
    status: 'disconnected',
    features: [
      'Tweet posting',
      'Timeline access',
      'Direct messaging',
      'Analytics'
    ],
    requiredScopes: [
      'tweet.read',
      'tweet.write',
      'users.read',
      'dm.write'
    ],
    webhookSupport: true,
    apiDocs: 'https://developer.twitter.com/en/docs'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI and machine learning capabilities',
    type: 'ai',
    provider: 'OpenAI',
    icon: '/images/integrations/openai.svg',
    status: 'disconnected',
    features: [
      'GPT models',
      'DALL-E integration',
      'Embeddings',
      'Fine-tuning'
    ],
    requiredScopes: [
      'model.read',
      'model.write',
      'files.read',
      'files.write'
    ],
    webhookSupport: false,
    apiDocs: 'https://platform.openai.com/docs/api-reference'
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    description: 'Cloud infrastructure and services',
    type: 'cloud',
    provider: 'Google',
    icon: '/images/integrations/google-cloud.svg',
    status: 'disconnected',
    features: [
      'Cloud storage',
      'Compute engine',
      'Cloud functions',
      'AI services'
    ],
    requiredScopes: [
      'cloud-platform',
      'storage.read',
      'compute.read',
      'ai.read'
    ],
    webhookSupport: true,
    apiDocs: 'https://cloud.google.com/apis/docs/overview'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'File storage and collaboration',
    type: 'storage',
    provider: 'Google',
    icon: '/images/integrations/google-drive.svg',
    status: 'disconnected',
    features: [
      'File storage',
      'Document sharing',
      'Collaboration',
      'Version control'
    ],
    requiredScopes: [
      'drive.file',
      'drive.readonly',
      'drive.metadata.readonly'
    ],
    webhookSupport: true,
    apiDocs: 'https://developers.google.com/drive/api'
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Workflow automation platform',
    type: 'automation',
    provider: 'n8n',
    icon: '/images/integrations/n8n.svg',
    status: 'disconnected',
    features: [
      'Workflow automation',
      'API integration',
      'Custom triggers',
      'Data transformation'
    ],
    requiredScopes: [
      'workflow.read',
      'workflow.write',
      'workflow.execute'
    ],
    webhookSupport: true,
    apiDocs: 'https://docs.n8n.io/api/'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'App integration and automation',
    type: 'automation',
    provider: 'Zapier',
    icon: '/images/integrations/zapier.svg',
    status: 'disconnected',
    features: [
      'App connections',
      'Automated tasks',
      'Custom workflows',
      'Data mapping'
    ],
    requiredScopes: [
      'zaps.read',
      'zaps.write',
      'zaps.execute'
    ],
    webhookSupport: true,
    apiDocs: 'https://zapier.com/developer/documentation'
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Visual automation platform',
    type: 'automation',
    provider: 'Make',
    icon: '/images/integrations/make.svg',
    status: 'disconnected',
    features: [
      'Visual workflows',
      'Data routing',
      'Error handling',
      'Scheduling'
    ],
    requiredScopes: [
      'scenarios.read',
      'scenarios.write',
      'scenarios.execute'
    ],
    webhookSupport: true,
    apiDocs: 'https://www.make.com/en/api-documentation'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Advanced AI language models',
    type: 'ai',
    provider: 'Anthropic',
    icon: '/images/integrations/anthropic.svg',
    status: 'disconnected',
    features: [
      'Claude models',
      'Text generation',
      'Content analysis',
      'Custom prompts'
    ],
    requiredScopes: [
      'models.read',
      'completions.create',
      'messages.create'
    ],
    webhookSupport: false,
    apiDocs: 'https://anthropic.com/api'
  }
]

export interface IntegrationEvent {
  id: string
  integrationId: string
  type: 'connection' | 'sync' | 'error' | 'webhook' | 'health_check' | 'key_rotation'
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
    integrationId: 'slack',
    type: 'webhook',
    status: 'failure',
    message: 'Failed to configure webhook endpoint',
    timestamp: '2024-01-14T15:45:00Z',
    details: {
      error: 'Invalid webhook URL',
      code: 'INVALID_URL'
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
  healthStatus: {
    healthy: number
    degraded: number
    down: number
  }
}

// Mock integration statistics
export const MOCK_STATS: IntegrationStats = {
  totalIntegrations: 12,
  activeIntegrations: 5,
  failedIntegrations: 1,
  lastSyncTime: '2024-01-15T12:00:00Z',
  syncStatus: 'idle',
  eventsToday: 145,
  errorRate: 0.02,
  healthStatus: {
    healthy: 4,
    degraded: 1,
    down: 0
  }
}
