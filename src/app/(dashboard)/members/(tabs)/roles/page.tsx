'use client'

import React, { useState } from 'react'

// Import components
import RolesHeader from './components/RolesHeader'
import RolesGrid from './components/RolesGrid'
import RoleModal from './components/RoleModal'

// Mock data for roles
const roles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: ['all'],
    staffCount: 2,
    status: 'active',
    color: 'bg-red-100 text-red-800',
    createdAt: '2024-01-01',
    isSystem: true
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Department management and staff oversight',
    permissions: ['staff:read', 'staff:write', 'inventory:read', 'menu:read', 'reports:read'],
    staffCount: 5,
    status: 'active',
    color: 'bg-blue-100 text-blue-800',
    createdAt: '2024-01-01',
    isSystem: false
  },
  {
    id: 3,
    name: 'Staff',
    description: 'Basic operational access',
    permissions: ['menu:read', 'inventory:read', 'orders:read', 'orders:write'],
    staffCount: 12,
    status: 'active',
    color: 'bg-green-100 text-green-800',
    createdAt: '2024-01-01',
    isSystem: false
  },
  {
    id: 4,
    name: 'Cashier',
    description: 'Order processing and customer service',
    permissions: ['orders:read', 'orders:write', 'customers:read', 'menu:read'],
    staffCount: 8,
    status: 'active',
    color: 'bg-purple-100 text-purple-800',
    createdAt: '2024-01-01',
    isSystem: false
  },
  {
    id: 5,
    name: 'Kitchen Staff',
    description: 'Food preparation and kitchen operations',
    permissions: ['menu:read', 'inventory:read', 'orders:read'],
    staffCount: 6,
    status: 'active',
    color: 'bg-orange-100 text-orange-800',
    createdAt: '2024-01-01',
    isSystem: false
  }
]

const permissionCategories = [
  {
    name: 'Staff Management',
    permissions: [
      { id: 'staff:read', label: 'View Staff', description: 'Can view staff information' },
      { id: 'staff:write', label: 'Manage Staff', description: 'Can add, edit, and remove staff' },
      { id: 'staff:delete', label: 'Delete Staff', description: 'Can permanently remove staff' }
    ]
  },
  {
    name: 'Menu Management',
    permissions: [
      { id: 'menu:read', label: 'View Menu', description: 'Can view menu items and categories' },
      { id: 'menu:write', label: 'Manage Menu', description: 'Can add, edit, and remove menu items' },
      { id: 'menu:delete', label: 'Delete Menu', description: 'Can permanently remove menu items' }
    ]
  },
  {
    name: 'Inventory Management',
    permissions: [
      { id: 'inventory:read', label: 'View Inventory', description: 'Can view inventory levels and items' },
      { id: 'inventory:write', label: 'Manage Inventory', description: 'Can update inventory levels and add items' },
      { id: 'inventory:delete', label: 'Delete Inventory', description: 'Can remove inventory items' }
    ]
  },
  {
    name: 'Order Management',
    permissions: [
      { id: 'orders:read', label: 'View Orders', description: 'Can view order details and status' },
      { id: 'orders:write', label: 'Manage Orders', description: 'Can create, update, and process orders' },
      { id: 'orders:delete', label: 'Delete Orders', description: 'Can cancel and remove orders' }
    ]
  },
  {
    name: 'Customer Management',
    permissions: [
      { id: 'customers:read', label: 'View Customers', description: 'Can view customer information' },
      { id: 'customers:write', label: 'Manage Customers', description: 'Can add, edit, and update customer data' },
      { id: 'customers:delete', label: 'Delete Customers', description: 'Can remove customer records' }
    ]
  },
  {
    name: 'Reports & Analytics',
    permissions: [
      { id: 'reports:read', label: 'View Reports', description: 'Can access and view reports' },
      { id: 'reports:write', label: 'Generate Reports', description: 'Can create and export reports' },
      { id: 'reports:delete', label: 'Delete Reports', description: 'Can remove generated reports' }
    ]
  },
  {
    name: 'System Administration',
    permissions: [
      { id: 'system:read', label: 'View System', description: 'Can view system settings and configuration' },
      { id: 'system:write', label: 'Manage System', description: 'Can modify system settings and configuration' },
      { id: 'system:delete', label: 'System Control', description: 'Can perform system-level operations' }
    ]
  }
]

export default function RolesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)

  // Filtered roles based on search and filters
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || role.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  // Helper function to get permission labels
  const getPermissionLabel = (permission: string) => {
    const allPermissions = permissionCategories.flatMap(cat => cat.permissions)
    const found = allPermissions.find(p => p.id === permission)
    return found ? found.label : permission
  }

  // Event handlers
  const handleAddRole = () => {
    setShowAddModal(true)
    setEditingRole(null)
  }

  const handleEditRole = (role: any) => {
    setEditingRole(role)
    setShowAddModal(true)
  }

  const handleViewStaff = (role: any) => {
    console.log('Viewing staff for role:', role.name)
  }

  const handleExport = () => {
    console.log('Exporting roles data')
  }

  const handleImport = () => {
    console.log('Importing roles data')
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingRole(null)
  }

  const handleModalSubmit = () => {
    console.log('Submitting role form')
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <RolesHeader 
        onAddRole={handleAddRole}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Roles Grid */}
      {viewMode === 'grid' && (
        <RolesGrid
          roles={filteredRoles}
          onEdit={handleEditRole}
          onViewStaff={handleViewStaff}
          getPermissionLabel={getPermissionLabel}
        />
      )}

      {/* Add/Edit Role Modal */}
      <RoleModal
        isOpen={showAddModal}
        editingRole={editingRole}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        permissionCategories={permissionCategories}
      />
    </div>
  )
}
