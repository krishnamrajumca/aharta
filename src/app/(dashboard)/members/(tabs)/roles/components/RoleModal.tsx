'use client'

import React, { useState } from 'react'
import { X, Check, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  staffCount: number
  status: string
  color: string
  createdAt: string
  isSystem: boolean
}

interface PermissionCategory {
  name: string
  permissions: {
    id: string
    label: string
    description: string
  }[]
}

interface RoleModalProps {
  isOpen: boolean
  editingRole: Role | null
  onClose: () => void
  onSubmit: () => void
  permissionCategories: PermissionCategory[]
}

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const colorOptions: DropdownOption[] = [
  { value: 'bg-red-100 text-red-800', label: 'Red' },
  { value: 'bg-blue-100 text-blue-800', label: 'Blue' },
  { value: 'bg-green-100 text-green-800', label: 'Green' },
  { value: 'bg-purple-100 text-purple-800', label: 'Purple' },
  { value: 'bg-orange-100 text-orange-800', label: 'Orange' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow' },
  { value: 'bg-pink-100 text-pink-800', label: 'Pink' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'Indigo' }
]

export default function RoleModal({ 
  isOpen, 
  editingRole, 
  onClose, 
  onSubmit, 
  permissionCategories 
}: RoleModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    editingRole?.permissions || []
  )

  if (!isOpen) return null

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(p => p !== permissionId)
      } else {
        return [...prev, permissionId]
      }
    })
  }

  const handleSelectAll = () => {
    const allPermissions = permissionCategories.flatMap(cat => 
      cat.permissions.map(p => p.id)
    )
    setSelectedPermissions(allPermissions)
  }

  const handleClearAll = () => {
    setSelectedPermissions([])
  }

  const isPermissionSelected = (permissionId: string) => {
    return selectedPermissions.includes(permissionId)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingRole ? 'Edit Role' : 'Add New Role'}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            {editingRole ? 'Update the role details and permissions below' : 'Fill in the details to add a new role'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <Input defaultValue={editingRole?.name || ''} placeholder="Enter role name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingRole?.status || 'active'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
              <Dropdown
                options={colorOptions}
                value={editingRole?.color || 'bg-blue-100 text-blue-800'}
                onChange={(value) => console.log('Color changed:', value)}
                placeholder="Select color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <Input 
                type="date" 
                defaultValue={editingRole?.createdAt || new Date().toISOString().split('T')[0]} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Input defaultValue={editingRole?.description || ''} placeholder="Enter role description" />
          </div>

          {/* Permission Management */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-sm"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-sm"
                >
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {permissionCategories.map((category) => (
                <div key={category.name} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          isPermissionSelected(permission.id)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePermissionToggle(permission.id)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isPermissionSelected(permission.id)
                            ? 'border-green-600 bg-green-600'
                            : 'border-gray-300'
                        }`}>
                          {isPermissionSelected(permission.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {permission.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {permission.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Permission Summary */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Selected Permissions:</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedPermissions.length} permissions
                </span>
              </div>
              {selectedPermissions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedPermissions.slice(0, 5).map(permissionId => {
                    const permission = permissionCategories
                      .flatMap(cat => cat.permissions)
                      .find(p => p.id === permissionId)
                    return (
                      <span key={permissionId} className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {permission?.label || permissionId}
                      </span>
                    )
                  })}
                  {selectedPermissions.length > 5 && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      +{selectedPermissions.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={onSubmit}>
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
