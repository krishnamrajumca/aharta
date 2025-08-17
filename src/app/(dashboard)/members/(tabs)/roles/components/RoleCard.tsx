'use client'

import React from 'react'
import { Shield, Edit, Users, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

interface RoleCardProps {
  role: Role
  onEdit: (role: Role) => void
  onViewStaff: (role: Role) => void
  getPermissionLabel: (permission: string) => string
}

export default function RoleCard({ role, onEdit, onViewStaff, getPermissionLabel }: RoleCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        {/* Header with Status and Staff Count */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
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

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{role.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{role.description}</p>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{role.staffCount} staff members</span>
          </div>
        </div>

        {/* Permission Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Access Level</span>
            <span className="text-sm font-medium text-gray-900">
              {role.permissions.includes('all') ? 'Full Access' : 'Limited Access'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Permissions</span>
            <span className="text-sm font-medium text-gray-900">
              {role.permissions.includes('all') ? 'All permissions' : `${role.permissions.length} permissions`}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm font-medium text-gray-900 capitalize">{role.status}</span>
          </div>
        </div>

        {/* Permission Details */}
        {!role.permissions.includes('all') && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>Permissions:</span>
            </div>
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
            onClick={() => onEdit(role)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            disabled={role.isSystem}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewStaff(role)}
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            <Users className="h-4 w-4 mr-2" />
            View Staff
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
