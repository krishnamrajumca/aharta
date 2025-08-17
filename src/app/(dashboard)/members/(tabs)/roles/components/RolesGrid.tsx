'use client'

import React from 'react'
import RoleCard from './RoleCard'

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

interface RolesGridProps {
  roles: Role[]
  onEdit: (role: Role) => void
  onViewStaff: (role: Role) => void
  getPermissionLabel: (permission: string) => string
}

export default function RolesGrid({ roles, onEdit, onViewStaff, getPermissionLabel }: RolesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onEdit={onEdit}
          onViewStaff={onViewStaff}
          getPermissionLabel={getPermissionLabel}
        />
      ))}
    </div>
  )
}
