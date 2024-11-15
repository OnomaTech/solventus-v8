import { useState, useEffect } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { 
  type Integration,
  type IntegrationConfig
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

  useEffect(() => {
    if (integration.config) {
      setConfig(integration.config)
    }
  }, [integration])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate required fields based on integration type
    switch (integration.type) {
      case 'payment':
        if (!config.apiKey) {
          newErrors.apiKey = 'API Key is required'
        }
        if (!config.webhookUrl) {
          newErrors.webhookUrl = 'Webhook URL is required'
        }
        break

      case 'email':
        if (!config.apiKey) {
          newErrors.apiKey = 'API Key is required'
        }
        break

      case 'crm':
        if (!config.clientId) {
          newErrors.clientId = 'Client ID is required'
        }
        if (!config.clientSecret) {
          newErrors.clientSecret = 'Client Secret is required'
        }
        break

      case 'calendar':
        if (!config.clientId) {
          newErrors.clientId = 'Client ID is required'
        }
        if (!config.clientSecret) {
          newErrors.clientSecret = 'Client Secret is required'
        }
        break

      case 'storage':
        if (!config.apiKey) {
          newErrors.apiKey = 'API Key is required'
        }
        break
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

  const renderFields = () => {
    switch (integration.type) {
      case 'payment':
        return (
          <>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className={errors.apiKey ? 'border-red-500' : ''}
              />
              {errors.apiKey && (
                <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
              )}
            </div>
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={config.webhookUrl || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                className={errors.webhookUrl ? 'border-red-500' : ''}
              />
              {errors.webhookUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.webhookUrl}</p>
              )}
            </div>
          </>
        )

      case 'email':
      case 'storage':
        return (
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={config.apiKey || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              className={errors.apiKey ? 'border-red-500' : ''}
            />
            {errors.apiKey && (
              <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
            )}
          </div>
        )

      case 'crm':
      case 'calendar':
        return (
          <>
            <div>
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
            </div>
            <div>
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                value={config.clientSecret || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
                className={errors.clientSecret ? 'border-red-500' : ''}
              />
              {errors.clientSecret && (
                <p className="text-red-500 text-sm mt-1">{errors.clientSecret}</p>
              )}
            </div>
          </>
        )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle>Configure {integration.name}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
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

              <div className="space-y-4">
                {renderFields()}
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
