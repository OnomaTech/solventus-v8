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

export type WebhookEventType = 
  | 'all'
  | 'data.created'
  | 'data.updated'
  | 'data.deleted'
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'message.received'
  | 'file.uploaded'
  | 'error.occurred'
  | 'status.changed'

export interface WebhookRetryConfig {
  maxAttempts: number
  initialDelay: number // milliseconds
  maxDelay: number // milliseconds
  backoffMultiplier: number
}

export interface WebhookConfig {
  url: string
  secret?: string
  description?: string
  enabled: boolean
  events: WebhookEventType[]
  headers?: Record<string, string>
  retryConfig?: WebhookRetryConfig
  testPayload?: any
  lastDelivery?: {
    timestamp: string
    status: 'success' | 'failure'
    responseCode?: number
    responseTime?: number
  }
}

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
  webhooks?: WebhookConfig[]
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
}

export interface IntegrationEvent {
  id: string
  integrationId: string
  type: 'connection' | 'sync' | 'error' | 'webhook'
  status: 'success' | 'failure' | 'pending'
  message: string
  timestamp: string
  details?: Record<string, any>
}

export interface IntegrationStats {
  totalIntegrations: number
  activeIntegrations: number
  failedIntegrations: number
  lastSyncTime?: string
  syncStatus: 'idle' | 'syncing' | 'error'
  eventsToday: number
  errorRate: number
}

// Re-export mock data
export { AVAILABLE_INTEGRATIONS, MOCK_EVENTS, MOCK_STATS } from './integrationsMockData'
