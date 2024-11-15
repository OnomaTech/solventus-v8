import { useState, useEffect } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from "../../../lib/utils"
import { 
  type Integration,
  type IntegrationConfig,
  type Environment,
  type RateLimitSettings,
  type ApiKeySettings,
  type CustomHeaders,
  type AdvancedSettings
} from "../../../types/integrations"

interface IntegrationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { config: IntegrationConfig }) => void
  integration: Integration
}

export function IntegrationDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  integration 
}: IntegrationDialogProps) {
  const [config, setConfig] = useState<IntegrationConfig>(
    integration.config || {}
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showApiKey, setShowApiKey] = useState(false)
  const [showClientSecret, setShowClientSecret] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  useEffect(() => {
    if (integration.config) {
      setConfig(integration.config)
    }
  }, [integration])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    switch (integration.type) {
      case 'payment':
        if (!config.apiKey) newErrors.apiKey = 'API Key is required'
        if (!config.webhookUrl) newErrors.webhookUrl = 'Webhook URL is required'
        break

      case 'ai':
        if (!config.apiKey) newErrors.apiKey = 'API Key is required'
        if (integration.id === 'openai' && !config.model) {
          newErrors.model = 'Model selection is required'
        }
        break

      case 'communication':
        if (!config.clientId) newErrors.clientId = 'Client ID is required'
        if (!config.clientSecret) newErrors.clientSecret = 'Client Secret is required'
        break

      default:
        if (!config.apiKey) newErrors.apiKey = 'API Key is required'
    }

    // Environment validation
    if (config.environment && !integration.supportedEnvironments?.includes(config.environment)) {
      newErrors.environment = 'Selected environment is not supported'
    }

    // Rate limits validation
    if (config.rateLimits) {
      const { requestsPerMinute, requestsPerHour, requestsPerDay } = config.rateLimits
      if (requestsPerMinute && requestsPerMinute < 0) {
        newErrors.requestsPerMinute = 'Must be a positive number'
      }
      if (requestsPerHour && requestsPerHour < 0) {
        newErrors.requestsPerHour = 'Must be a positive number'
      }
      if (requestsPerDay && requestsPerDay < 0) {
        newErrors.requestsPerDay = 'Must be a positive number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({ config })
    }
  }

  const renderBasicFields = () => {
    const fields = []

    switch (integration.type) {
      case 'payment':
        fields.push(
          <div key="apiKey" className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={config.apiKey || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className={errors.apiKey ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.apiKey && (
              <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
            )}
          </div>
        )
        break

      case 'communication':
        fields.push(
          <div key="clientId" className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input
              id="clientId"
              value={config.clientId || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
              className={errors.clientId ? 'border-red-500' : ''}
            />
            {errors.clientId && (
              <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>
            )}
          </div>,
          <div key="clientSecret" className="space-y-2">
            <Label htmlFor="clientSecret">Client Secret</Label>
            <div className="relative">
              <Input
                id="clientSecret"
                type={showClientSecret ? "text" : "password"}
                value={config.clientSecret || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
                className={errors.clientSecret ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowClientSecret(!showClientSecret)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showClientSecret ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.clientSecret && (
              <p className="text-red-500 text-sm mt-1">{errors.clientSecret}</p>
            )}
          </div>
        )
        break

      default:
        fields.push(
          <div key="apiKey" className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={config.apiKey || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className={errors.apiKey ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.apiKey && (
              <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
            )}
          </div>
        )
    }

    // Add environment selection if supported
    if (integration.supportedEnvironments?.length) {
      fields.push(
        <div key="environment" className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <select
            id="environment"
            value={config.environment || 'production'}
            onChange={(e) => setConfig(prev => ({ 
              ...prev, 
              environment: e.target.value as Environment 
            }))}
            className="w-full border rounded-md px-3 py-2"
          >
            {integration.supportedEnvironments.map(env => (
              <option key={env} value={env}>
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return fields
  }

  const renderRateLimitFields = () => {
    const rateLimits = config.rateLimits || integration.defaultRateLimits || {}
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="requestsPerMinute">Requests per Minute</Label>
            <Input
              id="requestsPerMinute"
              type="number"
              value={rateLimits.requestsPerMinute || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                rateLimits: {
                  ...prev.rateLimits,
                  requestsPerMinute: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestsPerHour">Requests per Hour</Label>
            <Input
              id="requestsPerHour"
              type="number"
              value={rateLimits.requestsPerHour || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                rateLimits: {
                  ...prev.rateLimits,
                  requestsPerHour: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="requestsPerDay">Requests per Day</Label>
            <Input
              id="requestsPerDay"
              type="number"
              value={rateLimits.requestsPerDay || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                rateLimits: {
                  ...prev.rateLimits,
                  requestsPerDay: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="concurrentRequests">Concurrent Requests</Label>
            <Input
              id="concurrentRequests"
              type="number"
              value={rateLimits.concurrentRequests || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                rateLimits: {
                  ...prev.rateLimits,
                  concurrentRequests: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderApiKeySettings = () => {
    const apiKeySettings = config.apiKeySettings || {}
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rotationPeriod">Key Rotation Period (days)</Label>
            <Input
              id="rotationPeriod"
              type="number"
              value={apiKeySettings.rotationPeriod || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                apiKeySettings: {
                  ...prev.apiKeySettings,
                  rotationPeriod: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              value={apiKeySettings.usageLimit || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                apiKeySettings: {
                  ...prev.apiKeySettings,
                  usageLimit: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiresAt">Key Expiration Date</Label>
          <Input
            id="expiresAt"
            type="datetime-local"
            value={apiKeySettings.expiresAt?.slice(0, 16) || ''}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              apiKeySettings: {
                ...prev.apiKeySettings,
                expiresAt: e.target.value
              }
            }))}
          />
        </div>
      </div>
    )
  }

  const renderAdvancedSettings = () => {
    const advancedSettings = config.advancedSettings || {}
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeout">Request Timeout (ms)</Label>
            <Input
              id="timeout"
              type="number"
              value={advancedSettings.timeout || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                advancedSettings: {
                  ...prev.advancedSettings,
                  timeout: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retryAttempts">Retry Attempts</Label>
            <Input
              id="retryAttempts"
              type="number"
              value={advancedSettings.retryAttempts || ''}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                advancedSettings: {
                  ...prev.advancedSettings,
                  retryAttempts: parseInt(e.target.value)
                }
              }))}
              min="0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customEndpoint">Custom Endpoint</Label>
          <Input
            id="customEndpoint"
            value={advancedSettings.customEndpoint || ''}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advancedSettings: {
                ...prev.advancedSettings,
                customEndpoint: e.target.value
              }
            }))}
            placeholder="https://api.example.com/v1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="proxyUrl">Proxy URL</Label>
          <Input
            id="proxyUrl"
            value={advancedSettings.proxyUrl || ''}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advancedSettings: {
                ...prev.advancedSettings,
                proxyUrl: e.target.value
              }
            }))}
            placeholder="http://proxy.example.com:8080"
          />
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Configure {integration.name}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 relative">
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
                  <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
                  <TabsTrigger value="api-key">API Key Settings</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  {renderBasicFields()}
                </TabsContent>

                <TabsContent value="rate-limits" className="space-y-4 mt-4">
                  {renderRateLimitFields()}
                </TabsContent>

                <TabsContent value="api-key" className="space-y-4 mt-4">
                  {renderApiKeySettings()}
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-4">
                  {renderAdvancedSettings()}
                </TabsContent>
              </Tabs>

              <div className="border rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Required Scopes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {integration.requiredScopes.map((scope) => (
                    <div
                      key={scope}
                      className="text-sm px-2 py-1 bg-gray-100 rounded"
                    >
                      {scope}
                    </div>
                  ))}
                </div>
              </div>

              {integration.webhookSupport && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Webhook Support</h4>
                  <p className="text-sm text-gray-600">
                    This integration supports webhooks for real-time updates.
                    Configure your webhook endpoint to receive events.
                  </p>
                </div>
              )}

              <div className="mt-4">
                <a
                  href={integration.apiDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View API Documentation →
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {integration.status === 'connected' ? 'Update Connection' : 'Connect'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
