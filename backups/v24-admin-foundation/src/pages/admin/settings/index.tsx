import { useState } from 'react'
import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { UserDialog } from "../../../components/admin/dialogs/UserDialog"
import { RoleDialog } from "../../../components/admin/dialogs/RoleDialog"
import { IntegrationDialog } from "../../../components/admin/dialogs/IntegrationDialog"
import { SYSTEM_ROLES, type Role } from "../../../types/roles"
import { 
  AVAILABLE_INTEGRATIONS,
  MOCK_EVENTS,
  type Integration,
  type IntegrationEvent
} from "../../../types/integrations"
import { 
  Users, Mail, Settings as SettingsIcon, Shield,
  Building, Globe, Bell, Database, UserCog,
  Link2, CheckCircle2, XCircle, Clock, Settings
} from 'lucide-react'

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@solventus.com', role: 'admin', lastLogin: '2024-01-15' },
  { id: 2, name: 'Manager User', email: 'manager@solventus.com', role: 'manager', lastLogin: '2024-01-14' },
]

export default function SettingsPage() {
  // User Dialog State
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [users, setUsers] = useState(mockUsers)

  // Role Dialog State
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined)
  const [roles, setRoles] = useState<Role[]>(SYSTEM_ROLES)

  // Integration Dialog State
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [integrations, setIntegrations] = useState<Integration[]>(AVAILABLE_INTEGRATIONS)
  const [integrationEvents] = useState<IntegrationEvent[]>(MOCK_EVENTS)

  // Mock current user role (Super Administrator)
  const currentUserRole = SYSTEM_ROLES[0]

  // Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.solventus.com',
    smtpPort: '587',
    smtpUsername: 'notifications@solventus.com',
    senderName: 'Solventus Notifications'
  })

  const [companySettings, setCompanySettings] = useState({
    companyName: 'Solventus Financial',
    address: '123 Business Ave',
    phone: '(555) 123-4567',
    email: 'contact@solventus.com',
    website: 'www.solventus.com'
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    backupFrequency: 'daily',
    maxUploadSize: '10',
    sessionTimeout: '30'
  })

  // User Management Functions
  const handleAddUser = () => {
    setSelectedUser(null)
    setIsUserDialogOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsUserDialogOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleUserSubmit = (userData: any) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData }
          : user
      ))
    } else {
      setUsers([...users, { 
        id: users.length + 1,
        ...userData,
        lastLogin: 'Never'
      }])
    }
    setIsUserDialogOpen(false)
  }

  // Role Management Functions
  const handleAddRole = () => {
    setSelectedRole(undefined)
    setIsRoleDialogOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setIsRoleDialogOpen(true)
  }

  const handleDeleteRole = (roleId: number) => {
    const role = roles.find(r => r.id === roleId)
    if (!role) return

    // Don't allow deleting system roles
    if (role.isSystem) {
      alert('System roles cannot be deleted')
      return
    }

    // Don't allow deleting roles with users
    if (role.usersCount > 0) {
      alert('Cannot delete a role that has users assigned to it')
      return
    }

    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId))
    }
  }

  const handleRoleSubmit = (roleData: any) => {
    const newRole: Role = {
      ...roleData,
      id: selectedRole?.id || roles.length + 1,
      isSystem: selectedRole?.isSystem || false,
      usersCount: selectedRole?.usersCount || 0,
      createdAt: selectedRole?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id 
          ? newRole
          : role
      ))
    } else {
      setRoles([...roles, newRole])
    }
    setIsRoleDialogOpen(false)
  }

  // Integration Management Functions
  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsIntegrationDialogOpen(true)
  }

  const handleIntegrationSubmit = (data: { config: any }) => {
    if (selectedIntegration) {
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
    setIsIntegrationDialogOpen(false)
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
        <title>Settings - Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Role Management
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Settings
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button onClick={handleAddUser}>Add User</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Role</th>
                          <th className="p-3 text-left">Last Login</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {user.role}
                              </span>
                            </td>
                            <td className="p-3">{user.lastLogin}</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditUser(user)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Role Management</CardTitle>
                <Button onClick={handleAddRole}>Add Role</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="p-3 text-left">Role Name</th>
                          <th className="p-3 text-left">Description</th>
                          <th className="p-3 text-left">Level</th>
                          <th className="p-3 text-left">Users</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role) => (
                          <tr key={role.id} className="border-b">
                            <td className="p-3 font-medium">
                              {role.name}
                              {role.isSystem && (
                                <span className="ml-2 text-xs text-gray-500">(System)</span>
                              )}
                            </td>
                            <td className="p-3">{role.description}</td>
                            <td className="p-3">{role.level}</td>
                            <td className="p-3">{role.usersCount} users</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditRole(role)}
                                  disabled={role.isSystem && currentUserRole.level !== 0}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteRole(role.id)}
                                  disabled={role.isSystem || role.usersCount > 0}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integration Management</CardTitle>
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

                {/* Recent Integration Events */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Recent Events</h3>
                  <div className="space-y-4">
                    {integrationEvents.map((event) => (
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpServer">SMTP Server</Label>
                      <Input
                        id="smtpServer"
                        value={emailSettings.smtpServer}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpServer: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Email Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Company Info</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="maintenanceMode"
                          checked={systemSettings.maintenanceMode}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                          className="rounded"
                        />
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      System Configuration
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="backupFrequency">Backup Frequency</Label>
                        <select
                          id="backupFrequency"
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                          className="w-full border rounded-md px-3 py-2"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                        <Input
                          id="maxUploadSize"
                          type="number"
                          value={systemSettings.maxUploadSize}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, maxUploadSize: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save System Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <UserDialog
        isOpen={isUserDialogOpen}
        onClose={() => setIsUserDialogOpen(false)}
        onSubmit={handleUserSubmit}
        user={selectedUser}
      />

      <RoleDialog
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        onSubmit={handleRoleSubmit}
        role={selectedRole}
        allRoles={roles}
        currentUserRole={currentUserRole}
      />

      {selectedIntegration && (
        <IntegrationDialog
          isOpen={isIntegrationDialogOpen}
          onClose={() => setIsIntegrationDialogOpen(false)}
          onSubmit={handleIntegrationSubmit}
          integration={selectedIntegration}
        />
      )}
    </>
  )
}
