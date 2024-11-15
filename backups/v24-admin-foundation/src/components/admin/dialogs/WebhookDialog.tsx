import { useState, useEffect } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { AlertCircle, Play, CheckCircle2 } from 'lucide-react'
import { 
  type WebhookConfig,
  type WebhookEventType,
  type WebhookRetryConfig
} from "../../../types/integrations"

interface WebhookDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: WebhookConfig) => void
  webhook?: WebhookConfig
  availableEvents: WebhookEventType[]
  integrationName: string
}

const DEFAULT_RETRY_CONFIG: WebhookRetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 32000, // 32 seconds
  backoffMultiplier: 2
}

const DEFAULT_TEST_PAYLOAD = {
  event: "test.event",
  timestamp: new Date().toISOString(),
  data: {
    message: "This is a test webhook payload"
  }
}

type TestStatus = {
  status?: 'success' | 'error' | 'pending'
  message?: string
  responseTime?: number
}

export function WebhookDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  webhook,
  availableEvents,
  integrationName
}: WebhookDialogProps) {
  const [config, setConfig] = useState<WebhookConfig>(webhook || {
    url: '',
    secret: '',
    description: '',
    enabled: true,
    events: [],
    retryConfig: DEFAULT_RETRY_CONFIG,
    testPayload: DEFAULT_TEST_PAYLOAD
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('basic')
  const [testStatus, setTestStatus] = useState<TestStatus>({})

  useEffect(() => {
    if (webhook) {
      setConfig(webhook)
    }
  }, [webhook])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!config.url) {
      newErrors.url = 'Webhook URL is required'
    } else if (!config.url.startsWith('https://')) {
      newErrors.url = 'Webhook URL must use HTTPS'
    }

    if (!config.events.length) {
      newErrors.events = 'At least one event must be selected'
    }

    if (config.retryConfig) {
      const { maxAttempts, initialDelay, maxDelay, backoffMultiplier } = config.retryConfig
      if (maxAttempts < 1) {
        newErrors.maxAttempts = 'Must be at least 1'
      }
      if (initialDelay < 100) {
        newErrors.initialDelay = 'Must be at least 100ms'
      }
      if (maxDelay < initialDelay) {
        newErrors.maxDelay = 'Must be greater than initial delay'
      }
      if (backoffMultiplier < 1) {
        newErrors.backoffMultiplier = 'Must be at least 1'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(config)
    }
  }

  const toggleEvent = (event: WebhookEventType) => {
    setConfig(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }))
  }

  const handleTestWebhook = async () => {
    setTestStatus({ status: 'pending', message: 'Sending test webhook...' })
    
    try {
      const startTime = Date.now()
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.secret && { 'X-Webhook-Secret': config.secret }),
          ...(config.headers || {})
        },
        body: JSON.stringify(config.testPayload || DEFAULT_TEST_PAYLOAD)
      })

      const responseTime = Date.now() - startTime

      if (response.ok) {
        setTestStatus({
          status: 'success',
          message: `Webhook delivered successfully (${response.status})`,
          responseTime
        })
      } else {
        setTestStatus({
          status: 'error',
          message: `Failed to deliver webhook (${response.status})`,
          responseTime
        })
      }
    } catch (error) {
      setTestStatus({
        status: 'error',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Configure Webhook for {integrationName}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="retry">Retry Settings</TabsTrigger>
                <TabsTrigger value="test">Test Webhook</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="url">Webhook URL</Label>
                    <Input
                      id="url"
                      value={config.url}
                      onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
                      className={errors.url ? 'border-red-500' : ''}
                      placeholder="https://your-server.com/webhook"
                    />
                    {errors.url && (
                      <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="secret">Webhook Secret</Label>
                    <Input
                      id="secret"
                      type="password"
                      value={config.secret || ''}
                      onChange={(e) => setConfig(prev => ({ ...prev, secret: e.target.value }))}
                      placeholder="Optional: Used to verify webhook authenticity"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={config.description || ''}
                      onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Optional: Describe the purpose of this webhook"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enabled"
                      checked={config.enabled}
                      onChange={(e) => setConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="enabled">Enable Webhook</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <Label>Event Types</Label>
                  {errors.events && (
                    <p className="text-red-500 text-sm">{errors.events}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {availableEvents.map((event) => (
                      <div key={event} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`event-${event}`}
                          checked={config.events.includes(event)}
                          onChange={() => toggleEvent(event)}
                          className="rounded"
                        />
                        <Label htmlFor={`event-${event}`} className="text-sm">
                          {event.split('.').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="retry" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxAttempts">Max Retry Attempts</Label>
                      <Input
                        id="maxAttempts"
                        type="number"
                        value={config.retryConfig?.maxAttempts || DEFAULT_RETRY_CONFIG.maxAttempts}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          retryConfig: {
                            ...prev.retryConfig,
                            maxAttempts: parseInt(e.target.value)
                          }
                        }))}
                        min="1"
                        className={errors.maxAttempts ? 'border-red-500' : ''}
                      />
                      {errors.maxAttempts && (
                        <p className="text-red-500 text-sm mt-1">{errors.maxAttempts}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="initialDelay">Initial Delay (ms)</Label>
                      <Input
                        id="initialDelay"
                        type="number"
                        value={config.retryConfig?.initialDelay || DEFAULT_RETRY_CONFIG.initialDelay}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          retryConfig: {
                            ...prev.retryConfig,
                            initialDelay: parseInt(e.target.value)
                          }
                        }))}
                        min="100"
                        step="100"
                        className={errors.initialDelay ? 'border-red-500' : ''}
                      />
                      {errors.initialDelay && (
                        <p className="text-red-500 text-sm mt-1">{errors.initialDelay}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxDelay">Max Delay (ms)</Label>
                      <Input
                        id="maxDelay"
                        type="number"
                        value={config.retryConfig?.maxDelay || DEFAULT_RETRY_CONFIG.maxDelay}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          retryConfig: {
                            ...prev.retryConfig,
                            maxDelay: parseInt(e.target.value)
                          }
                        }))}
                        min="1000"
                        step="1000"
                        className={errors.maxDelay ? 'border-red-500' : ''}
                      />
                      {errors.maxDelay && (
                        <p className="text-red-500 text-sm mt-1">{errors.maxDelay}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="backoffMultiplier">Backoff Multiplier</Label>
                      <Input
                        id="backoffMultiplier"
                        type="number"
                        value={config.retryConfig?.backoffMultiplier || DEFAULT_RETRY_CONFIG.backoffMultiplier}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          retryConfig: {
                            ...prev.retryConfig,
                            backoffMultiplier: parseFloat(e.target.value)
                          }
                        }))}
                        min="1"
                        step="0.5"
                        className={errors.backoffMultiplier ? 'border-red-500' : ''}
                      />
                      {errors.backoffMultiplier && (
                        <p className="text-red-500 text-sm mt-1">{errors.backoffMultiplier}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="test" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testPayload">Test Payload</Label>
                    <textarea
                      id="testPayload"
                      value={JSON.stringify(config.testPayload || DEFAULT_TEST_PAYLOAD, null, 2)}
                      onChange={(e) => {
                        try {
                          const payload = JSON.parse(e.target.value)
                          setConfig(prev => ({ ...prev, testPayload: payload }))
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      className="w-full h-48 font-mono text-sm p-2 border rounded-md"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      type="button"
                      onClick={handleTestWebhook}
                      disabled={!config.url || testStatus.status === 'pending'}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Send Test Webhook
                    </Button>

                    {testStatus.status && (
                      <div className={`flex items-center gap-2 ${
                        testStatus.status === 'success' ? 'text-green-600' : 
                        testStatus.status === 'error' ? 'text-red-600' : 
                        'text-yellow-600'
                      }`}>
                        {testStatus.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : testStatus.status === 'error' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 animate-spin" />
                        )}
                        <span className="text-sm">
                          {testStatus.message}
                          {testStatus.responseTime && ` (${testStatus.responseTime}ms)`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {webhook ? 'Update Webhook' : 'Create Webhook'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
