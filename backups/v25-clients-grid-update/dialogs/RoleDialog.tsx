import { useState, useEffect } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { cn } from "../../../lib/utils"
import { 
  ALL_PERMISSIONS, 
  type Role,
  type Permission,
  getRolePermissions
} from "../../../types/roles"

interface RoleDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  role?: Role
  allRoles: Role[]
  currentUserRole: Role
}

export function RoleDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  role, 
  allRoles,
  currentUserRole 
}: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    level: role?.level || (currentUserRole.level + 1),
    parentRoleId: role?.parentRoleId || undefined,
    permissions: role?.permissions || []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [inheritedPermissions, setInheritedPermissions] = useState<string[]>([])

  // Update inherited permissions when parent role changes
  useEffect(() => {
    if (formData.parentRoleId) {
      const parentRole = allRoles.find(r => r.id === formData.parentRoleId)
      if (parentRole) {
        const parentPermissions = getRolePermissions(parentRole, allRoles)
        setInheritedPermissions(parentPermissions)
      }
    } else {
      setInheritedPermissions([])
    }
  }, [formData.parentRoleId, allRoles])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.level <= currentUserRole.level) {
      newErrors.level = 'Role level must be lower than your role level'
    }

    if (formData.permissions.length === 0 && inheritedPermissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected or inherited'
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
    // Don't allow toggling inherited permissions
    if (inheritedPermissions.includes(permission)) return

    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const toggleAllInCategory = (category: string, permissions: Record<string, Permission>) => {
    const permissionKeys = Object.keys(permissions)
    const allSelected = permissionKeys.every(key => {
      const permissionKey = `${category}.${key}`
      return formData.permissions.includes(permissionKey) || inheritedPermissions.includes(permissionKey)
    })

    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !p.startsWith(`${category}.`))
      }))
    } else {
      const newPermissions = permissionKeys
        .map(key => `${category}.${key}`)
        .filter(key => !inheritedPermissions.includes(key))
      
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...newPermissions]))
      }))
    }
  }

  // Get available parent roles (roles with level higher than this role)
  const availableParentRoles = allRoles.filter(r => 
    r.level < formData.level && r.id !== role?.id
  )

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Role Level</Label>
                  <Input
                    id="level"
                    type="number"
                    min={currentUserRole.level + 1}
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      level: parseInt(e.target.value),
                      // Clear parent if level becomes too low
                      parentRoleId: parseInt(e.target.value) <= (prev.parentRoleId ? 
                        allRoles.find(r => r.id === prev.parentRoleId)?.level || 0 : 0)
                        ? undefined 
                        : prev.parentRoleId
                    }))}
                    className={errors.level ? 'border-red-500' : ''}
                  />
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">{errors.level}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="parentRole">Parent Role (Optional)</Label>
                  <select
                    id="parentRole"
                    value={formData.parentRoleId || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      parentRoleId: e.target.value ? parseInt(e.target.value) : undefined
                    }))}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">No Parent Role</option>
                    {availableParentRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name} (Level {role.level})
                      </option>
                    ))}
                  </select>
                </div>
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
                          checked={Object.keys(permissions).every(key => {
                            const permissionKey = `${category}.${key}`
                            return formData.permissions.includes(permissionKey) || 
                                   inheritedPermissions.includes(permissionKey)
                          })}
                          onChange={() => toggleAllInCategory(category, permissions)}
                          className="rounded"
                        />
                        <Label htmlFor={`category-${category}`} className="font-medium">
                          {label}
                        </Label>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-6">
                        {Object.entries(permissions).map(([key, permission]) => {
                          const permissionKey = `${category}.${key}`
                          const isInherited = inheritedPermissions.includes(permissionKey)
                          return (
                            <div key={key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={permissionKey}
                                checked={formData.permissions.includes(permissionKey) || isInherited}
                                onChange={() => togglePermission(permissionKey)}
                                disabled={isInherited}
                                className="rounded"
                              />
                              <Label 
                                htmlFor={permissionKey} 
                                className={cn(
                                  "text-sm",
                                  isInherited && "text-gray-500 italic"
                                )}
                              >
                                {permission.label}
                                {isInherited && " (inherited)"}
                              </Label>
                            </div>
                          )
                        })}
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
