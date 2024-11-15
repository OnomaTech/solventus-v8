import { useState } from 'react'
import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { IntegrationDialog } from "../../../components/admin/dialogs/IntegrationDialog"
import { 
  AVAILABLE_INTEGRATIONS,
  MOCK_EVENTS,
  MOCK_STATS,
  type Integration,
  type IntegrationEvent,
  type IntegrationStats
} from "../../../types/integrations"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Link2,
  RefreshCcw,
  Settings,
  XCircle
} from 'lucide-react'

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(AVAILABLE_INTEGRATIONS)
  const [events] = useState<IntegrationEvent[]>(MOCK_EVENTS)
  const [stats] = useState<IntegrationStats>(MOCK_STATS)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsDialogOpen(true)
  }

  const handleIntegrationSubmit = (data: { config: any }) => {
    if (selectedIntegration) {
      // Update integration status and config
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === selectedIntegration.id
            ? {
                ...integration,
                status: 'connected',
                config: data.config,
                lastSync: new Date().toISOString()
              }
            : integration
        )
      )
    }
    setIsDialogOpen(false)
  }

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'pending':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Link2 className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <>
      <Head>
        <title>Integrations - Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Integrations</h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              // Refresh integrations status
            }}
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh Status
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Integrations</p>
                  <p className="text-2xl font-bold">{stats.totalIntegrations}</p>
                </div>
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Connections</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeIntegrations}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Failed Connections</p>
                  <p className="text-2xl font-bold text-red-600">{stats.failedIntegrations}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Events Today</p>
                  <p className="text-2xl font-bold">{stats.eventsToday}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 relative">
                        <img
                          src={integration.icon}
                          alt={integration.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.type}</p>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {integration.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className={getStatusColor(integration.status)}>
                        {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                      </span>
                    </div>
                    {integration.lastSync && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last Sync</span>
                        <span>{new Date(integration.lastSync).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleConfigureIntegration(integration)}
                    >
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-2 h-2 rounded-full
                      ${event.status === 'success' ? 'bg-green-500' : ''}
                      ${event.status === 'failure' ? 'bg-red-500' : ''}
                      ${event.status === 'pending' ? 'bg-yellow-500' : ''}
                    `} />
                    <div>
                      <p className="font-medium">{event.message}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {event.details && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Show event details
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedIntegration && (
        <IntegrationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleIntegrationSubmit}
          integration={selectedIntegration}
        />
      )}
    </>
  )
}
