'use client'

import React, { useState } from 'react'
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Users,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  GripVertical,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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
      { id: 'inventory:read', label: 'View Inventory', description: 'Can view inventory levels' },
      { id: 'inventory:write', label: 'Manage Inventory', description: 'Can update inventory levels' },
      { id: 'inventory:delete', label: 'Delete Inventory', description: 'Can remove inventory items' }
    ]
  },
  {
    name: 'Order Management',
    permissions: [
      { id: 'orders:read', label: 'View Orders', description: 'Can view order information' },
      { id: 'orders:write', label: 'Manage Orders', description: 'Can create and update orders' },
      { id: 'orders:delete', label: 'Delete Orders', description: 'Can cancel and remove orders' }
    ]
  },
  {
    name: 'Customer Management',
    permissions: [
      { id: 'customers:read', label: 'View Customers', description: 'Can view customer information' },
      { id: 'customers:write', label: 'Manage Customers', description: 'Can add and update customer data' },
      { id: 'customers:delete', label: 'Delete Customers', description: 'Can remove customer accounts' }
    ]
  },
  {
    name: 'Reports & Analytics',
    permissions: [
      { id: 'reports:read', label: 'View Reports', description: 'Can access business reports' },
      { id: 'reports:write', label: 'Generate Reports', description: 'Can create custom reports' }
    ]
  }
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function RolesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)

  const filteredRoles = roles.filter(role => {
    const matchesStatus = selectedStatus === 'all' || role.status === selectedStatus
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getPermissionLabel = (permissionId: string) => {
    for (const category of permissionCategories) {
      const permission = category.permissions.find(p => p.id === permissionId)
      if (permission) return permission.label
    }
    return permissionId
  }

  const openAddModal = () => {
    setShowAddModal(true)
    setEditingRole(null)
  }

  const openEditModal = (role: any) => {
    setEditingRole(role)
    setShowAddModal(true)
  }

  const resetModalState = () => {
    setShowAddModal(false)
    setEditingRole(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600">Define and manage staff roles and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search roles by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(Array.isArray(value) ? value[0] : value)}
            placeholder="Status"
          />
          <Dropdown
            options={viewModeOptions}
            value={viewMode}
            onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
            placeholder="View"
          />
        </div>
      </div>

      {/* Roles Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <Card 
              key={role.id} 
              className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                    {role.name}
                  </span>
                  {role.isSystem && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      System
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Staff Count</span>
                    <span className="text-sm font-medium text-gray-900">{role.staffCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Permissions</span>
                    <span className="text-sm font-medium text-gray-900">
                      {role.permissions.includes('all') ? 'All' : role.permissions.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Permission Preview */}
                {!role.permissions.includes('all') && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map(permission => (
                        <span key={permission} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {getPermissionLabel(permission)}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(role)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    disabled={role.isSystem}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    View Staff
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRoles.map((role) => (
            <Card 
              key={role.id} 
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-8 w-8 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                            {role.name}
                          </span>
                          {role.isSystem && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              System
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{role.staffCount} staff</div>
                        <div className="text-sm text-gray-500">
                          {role.permissions.includes('all') ? 'All permissions' : `${role.permissions.length} permissions`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        {role.permissions.includes('all') ? 'Full Access' : 'Limited Access'}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {role.staffCount} members
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {role.status}
                      </span>
                    </div>

                    {/* Permission Details */}
                    {!role.permissions.includes('all') && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>Permissions:</span>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map(permission => (
                              <span key={permission} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                {getPermissionLabel(permission)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(role)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      disabled={role.isSystem}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      View Staff
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingRole ? 'Edit Role' : 'Add New Role'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetModalState}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <Input defaultValue={editingRole?.name || ''} placeholder="Enter role name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value={editingRole?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter role description"
                  defaultValue={editingRole?.description || ''}
                />
              </div>

              {/* Permissions */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Permissions</h4>
                
                <div className="space-y-4">
                  {permissionCategories.map((category) => (
                    <div key={category.name} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">{category.name}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.permissions.map((permission) => (
                          <label key={permission.id} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              defaultChecked={editingRole?.permissions?.includes(permission.id) || false}
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900">{permission.label}</span>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={resetModalState}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingRole ? 'Update Role' : 'Add Role'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
