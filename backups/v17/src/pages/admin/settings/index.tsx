import { useState } from 'react'
import Head from 'next/head'
import { AdminLayout } from "../../../components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { UserDialog } from "../../../components/admin/dialogs/UserDialog"
import { RoleDialog } from "../../../components/admin/dialogs/RoleDialog"
import { 
  Users, Mail, Settings as SettingsIcon, Shield,
  Building, Globe, Bell, Database, UserCog
} from 'lucide-react'

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@solventus.com', role: 'admin', lastLogin: '2024-01-15' },
  { id: 2, name: 'Manager User', email: 'manager@solventus.com', role: 'manager', lastLogin: '2024-01-14' },
]

// Mock data for roles
const mockRoles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['dashboard.view', 'dashboard.viewAnalytics', 'settings.manageSystem'],
    usersCount: 2
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Client and content management',
    permissions: ['dashboard.view', 'clients.view', 'clients.edit'],
    usersCount: 3
  },
  {
    id: 3,
    name: 'Content Editor',
    description: 'Blog and service management',
    permissions: ['content.viewBlog', 'content.manageBlog'],
    usersCount: 1
  }
]

export default function SettingsPage() {
  // User Dialog State
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [users, setUsers] = useState(mockUsers)

  // Role Dialog State
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [roles, setRoles] = useState(mockRoles)

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
    setSelectedRole(null)
    setIsRoleDialogOpen(true)
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsRoleDialogOpen(true)
  }

  const handleDeleteRole = (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId))
    }
  }

  const handleRoleSubmit = (roleData: any) => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id 
          ? { ...role, ...roleData }
          : role
      ))
    } else {
      setRoles([...roles, { 
        id: roles.length + 1,
        ...roleData,
        usersCount: 0
      }])
    }
    setIsRoleDialogOpen(false)
  }

  return (
    <AdminLayout>
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
                          <th className="p-3 text-left">Users</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role) => (
                          <tr key={role.id} className="border-b">
                            <td className="p-3 font-medium">{role.name}</td>
                            <td className="p-3">{role.description}</td>
                            <td className="p-3">{role.usersCount} users</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditRole(role)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteRole(role.id)}
                                  disabled={role.usersCount > 0}
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
      />
    </AdminLayout>
  )
}
