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

export type Environment = 'production' | 'staging' | 'development'

export interface RateLimitSettings {
  requestsPerMinute?: number
  requestsPerHour?: number
  requestsPerDay?: number
  concurrentRequests?: number
}

export interface ApiKeySettings {
  expiresAt?: string
  rotationPeriod?: number // days
  usageLimit?: number
  lastRotated?: string
  environment?: Environment
}

export interface CustomHeaders {
  [key: string]: string
}

export interface AdvancedSettings {
  timeout?: number // milliseconds
  retryAttempts?: number
  retryDelay?: number // milliseconds
  proxyUrl?: string
  customEndpoint?: string
}

export interface IntegrationConfig {
  clientId?: string
  clientSecret?: string
  apiKey?: string
  webhookUrl?: string
  organizationId?: string
  workspace?: string
  model?: string
  environment?: Environment
  rateLimits?: RateLimitSettings
  apiKeySettings?: ApiKeySettings
  customHeaders?: CustomHeaders
  advancedSettings?: AdvancedSettings
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
  supportedEnvironments?: Environment[]
  defaultRateLimits?: RateLimitSettings
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
    apiDocs: 'https://docs.github.com/rest',
    supportedEnvironments: ['production', 'staging', 'development'],
    defaultRateLimits: {
      requestsPerHour: 5000,
      concurrentRequests: 10
    }
  },
  // ... other integrations with their specific settings
]

export interface IntegrationEvent {
  id: string
  integrationId: string
  type: 'connection' | 'sync' | 'error' | 'webhook' | 'health_check' | 'key_rotation' | 'rate_limit'
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
    integrationId: 'openai',
    type: 'rate_limit',
    status: 'failure',
    message: 'Rate limit exceeded',
    timestamp: '2024-01-14T15:45:00Z',
    details: {
      limit: 'requestsPerMinute',
      current: 65,
      max: 60
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
  rateLimitStatus: {
    withinLimits: number
    approaching: number
    exceeded: number
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
  },
  rateLimitStatus: {
    withinLimits: 4,
    approaching: 1,
    exceeded: 0
  }
}
