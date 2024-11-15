import { Integration, IntegrationEvent, IntegrationStats } from './integrations'

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
    apiDocs: 'https://stripe.com/docs/api',
    supportedEnvironments: ['production', 'staging'],
    defaultRateLimits: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      concurrentRequests: 25
    }
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
    apiDocs: 'https://platform.openai.com/docs/api-reference',
    supportedEnvironments: ['production'],
    defaultRateLimits: {
      requestsPerMinute: 60,
      requestsPerDay: 1000
    }
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
    apiDocs: 'https://api.slack.com/docs',
    supportedEnvironments: ['production']
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
    apiDocs: 'https://cloud.google.com/apis/docs/overview',
    supportedEnvironments: ['production', 'staging', 'development'],
    defaultRateLimits: {
      requestsPerMinute: 1000,
      concurrentRequests: 50
    }
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
    apiDocs: 'https://developers.google.com/drive/api',
    supportedEnvironments: ['production']
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
    apiDocs: 'https://developer.twitter.com/en/docs',
    supportedEnvironments: ['production']
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
    apiDocs: 'https://airtable.com/developers/web/api',
    supportedEnvironments: ['production']
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
    apiDocs: 'https://zapier.com/developer/documentation',
    supportedEnvironments: ['production']
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
    apiDocs: 'https://docs.n8n.io/api/',
    supportedEnvironments: ['production', 'development']
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
      'Scheduling',
      'Real-time execution'
    ],
    requiredScopes: [
      'scenarios.read',
      'scenarios.write',
      'scenarios.execute',
      'connections.manage'
    ],
    webhookSupport: true,
    apiDocs: 'https://www.make.com/en/api-documentation',
    supportedEnvironments: ['production', 'development'],
    defaultRateLimits: {
      requestsPerMinute: 50,
      concurrentRequests: 10
    }
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database',
    type: 'storage',
    provider: 'PostgreSQL',
    icon: '/images/integrations/postgresql.svg',
    status: 'disconnected',
    features: [
      'ACID compliance',
      'Complex queries',
      'JSON support',
      'Full-text search',
      'Replication',
      'Partitioning'
    ],
    requiredScopes: [
      'database.read',
      'database.write',
      'schema.modify',
      'user.manage',
      'replication.manage'
    ],
    webhookSupport: true,
    apiDocs: 'https://www.postgresql.org/docs/',
    supportedEnvironments: ['production', 'staging', 'development'],
    defaultRateLimits: {
      concurrentRequests: 100
    }
  }
]

export const MOCK_EVENTS: IntegrationEvent[] = [
  {
    id: '1',
    integrationId: 'stripe',
    type: 'connection',
    status: 'success',
    message: 'Successfully connected to Stripe',
    timestamp: '2024-01-15T10:30:00Z'
  }
]

export const MOCK_STATS: IntegrationStats = {
  totalIntegrations: 12,
  activeIntegrations: 5,
  failedIntegrations: 1,
  lastSyncTime: '2024-01-15T12:00:00Z',
  syncStatus: 'idle',
  eventsToday: 145,
  errorRate: 0.02
}
