export interface Permission {
  key: string
  label: string
  description?: string
}

export interface PermissionCategory {
  key: string
  label: string
  permissions: Record<string, Permission>
}

export interface Role {
  id: number
  name: string
  description: string
  level: number // Used for hierarchy (lower number = higher rank)
  parentRoleId?: number // For inheritance
  permissions: string[]
  usersCount: number
  isSystem?: boolean // For built-in roles that can't be deleted
  createdAt: string
  updatedAt: string
}

// Define all possible permissions with descriptions
export const ALL_PERMISSIONS: Record<string, PermissionCategory> = {
  dashboard: {
    key: 'dashboard',
    label: 'Dashboard',
    permissions: {
      view: {
        key: 'view',
        label: 'View dashboard',
        description: 'Access to view the main dashboard'
      },
      viewAnalytics: {
        key: 'viewAnalytics',
        label: 'View analytics',
        description: 'Access to view analytics and reports'
      }
    }
  },
  clients: {
    key: 'clients',
    label: 'Client Management',
    permissions: {
      view: {
        key: 'view',
        label: 'View clients',
        description: 'Access to view client list and profiles'
      },
      create: {
        key: 'create',
        label: 'Create clients',
        description: 'Ability to create new client accounts'
      },
      edit: {
        key: 'edit',
        label: 'Edit clients',
        description: 'Ability to modify client information'
      },
      delete: {
        key: 'delete',
        label: 'Delete clients',
        description: 'Ability to remove client accounts'
      },
      viewDocuments: {
        key: 'viewDocuments',
        label: 'View client documents',
        description: 'Access to view client documents'
      },
      manageDocuments: {
        key: 'manageDocuments',
        label: 'Manage client documents',
        description: 'Ability to upload and manage client documents'
      }
    }
  },
  content: {
    key: 'content',
    label: 'Content Management',
    permissions: {
      viewBlog: {
        key: 'viewBlog',
        label: 'View blog posts',
        description: 'Access to view blog content'
      },
      manageBlog: {
        key: 'manageBlog',
        label: 'Manage blog posts',
        description: 'Ability to create and edit blog posts'
      },
      viewServices: {
        key: 'viewServices',
        label: 'View services',
        description: 'Access to view service listings'
      },
      manageServices: {
        key: 'manageServices',
        label: 'Manage services',
        description: 'Ability to modify service offerings'
      },
      manageWebsite: {
        key: 'manageWebsite',
        label: 'Manage website content',
        description: 'Ability to edit website content'
      }
    }
  },
  appointments: {
    key: 'appointments',
    label: 'Appointments',
    permissions: {
      view: {
        key: 'view',
        label: 'View appointments',
        description: 'Access to view appointment calendar'
      },
      create: {
        key: 'create',
        label: 'Create appointments',
        description: 'Ability to schedule new appointments'
      },
      edit: {
        key: 'edit',
        label: 'Edit appointments',
        description: 'Ability to modify appointments'
      },
      delete: {
        key: 'delete',
        label: 'Delete appointments',
        description: 'Ability to cancel appointments'
      }
    }
  },
  settings: {
    key: 'settings',
    label: 'Settings',
    permissions: {
      viewSystem: {
        key: 'viewSystem',
        label: 'View system settings',
        description: 'Access to view system configuration'
      },
      manageSystem: {
        key: 'manageSystem',
        label: 'Manage system settings',
        description: 'Ability to modify system settings'
      },
      viewUsers: {
        key: 'viewUsers',
        label: 'View users',
        description: 'Access to view user accounts'
      },
      manageUsers: {
        key: 'manageUsers',
        label: 'Manage users',
        description: 'Ability to create and modify user accounts'
      },
      viewRoles: {
        key: 'viewRoles',
        label: 'View roles',
        description: 'Access to view role configurations'
      },
      manageRoles: {
        key: 'manageRoles',
        label: 'Manage roles',
        description: 'Ability to create and modify roles'
      }
    }
  }
}

// System roles with predefined hierarchies
export const SYSTEM_ROLES: Role[] = [
  {
    id: 1,
    name: 'Super Administrator',
    description: 'Complete system access with all permissions',
    level: 0, // Highest level
    permissions: Object.entries(ALL_PERMISSIONS).flatMap(([category, { permissions }]) =>
      Object.keys(permissions).map(permission => `${category}.${permission}`)
    ),
    usersCount: 1,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Administrator',
    description: 'System administration with limited system settings access',
    level: 1,
    parentRoleId: 1,
    permissions: [
      'dashboard.view',
      'dashboard.viewAnalytics',
      'clients.view',
      'clients.create',
      'clients.edit',
      'settings.viewUsers',
      'settings.manageUsers',
      'settings.viewRoles'
    ],
    usersCount: 2,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Manager',
    description: 'Client and content management capabilities',
    level: 2,
    parentRoleId: 2,
    permissions: [
      'dashboard.view',
      'clients.view',
      'clients.edit',
      'content.viewBlog',
      'content.manageBlog'
    ],
    usersCount: 3,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Helper functions for role management
export const getRolePermissions = (role: Role, allRoles: Role[]): string[] => {
  const permissions = new Set(role.permissions)
  
  // If role has a parent, include inherited permissions
  if (role.parentRoleId) {
    const parentRole = allRoles.find(r => r.id === role.parentRoleId)
    if (parentRole) {
      getRolePermissions(parentRole, allRoles).forEach(p => permissions.add(p))
    }
  }
  
  return Array.from(permissions)
}

export const hasPermission = (
  userRole: Role,
  permission: string,
  allRoles: Role[]
): boolean => {
  const permissions = getRolePermissions(userRole, allRoles)
  return permissions.includes(permission)
}

export const canManageRole = (
  userRole: Role,
  targetRole: Role,
  allRoles: Role[]
): boolean => {
  // Users can only manage roles of lower level (higher number)
  if (userRole.level >= targetRole.level) {
    return false
  }

  // Check if user has role management permissions
  return hasPermission(userRole, 'settings.manageRoles', allRoles)
}
