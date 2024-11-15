import { useState } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"

// Define all possible permissions
const ALL_PERMISSIONS = {
  dashboard: {
    label: 'Dashboard',
    permissions: {
      view: 'View dashboard',
      viewAnalytics: 'View analytics'
    }
  },
  clients: {
    label: 'Client Management',
    permissions: {
      view: 'View clients',
      create: 'Create clients',
      edit: 'Edit clients',
      delete: 'Delete clients',
      viewDocuments: 'View client documents',
      manageDocuments: 'Manage client documents'
    }
  },
  content: {
    label: 'Content Management',
    permissions: {
      viewBlog: 'View blog posts',
      manageBlog: 'Manage blog posts',
      viewServices: 'View services',
      manageServices: 'Manage services',
      manageWebsite: 'Manage website content'
    }
  },
  appointments: {
    label: 'Appointments',
    permissions: {
      view: 'View appointments',
      create: 'Create appointments',
      edit: 'Edit appointments',
      delete: 'Delete appointments'
    }
  },
  settings: {
    label: 'Settings',
    permissions: {
      viewSystem: 'View system settings',
      manageSystem: 'Manage system settings',
      viewUsers: 'View users',
      manageUsers: 'Manage users',
      viewRoles: 'View roles',
      manageRoles: 'Manage roles'
    }
  }
}

interface RoleDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  role?: {
    id?: number
    name: string
    description: string
    permissions: string[]
  }
}

export function RoleDialog({ isOpen, onClose, onSubmit, role }: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const toggleAllInCategory = (category: string, categoryPermissions: Record<string, string>) => {
    const permissionKeys = Object.keys(categoryPermissions)
    const allSelected = permissionKeys.every(key => 
      formData.permissions.includes(`${category}.${key}`)
    )

    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !p.startsWith(`${category}.`))
      }))
    } else {
      const newPermissions = permissionKeys.map(key => `${category}.${key}`)
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...newPermissions]))
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{role?.id ? 'Edit Role' : 'Create New Role'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <Label>Permissions</Label>
                {errors.permissions && (
                  <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>
                )}
                <div className="space-y-4 mt-2">
                  {Object.entries(ALL_PERMISSIONS).map(([category, { label, permissions }]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={Object.keys(permissions).every(key => 
                            formData.permissions.includes(`${category}.${key}`)
                          )}
                          onChange={() => toggleAllInCategory(category, permissions)}
                          className="rounded"
                        />
                        <Label htmlFor={`category-${category}`} className="font-medium">
                          {label}
                        </Label>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-6">
                        {Object.entries(permissions).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`${category}.${key}`}
                              checked={formData.permissions.includes(`${category}.${key}`)}
                              onChange={() => togglePermission(`${category}.${key}`)}
                              className="rounded"
                            />
                            <Label htmlFor={`${category}.${key}`} className="text-sm">
                              {label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {role?.id ? 'Save Changes' : 'Create Role'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
