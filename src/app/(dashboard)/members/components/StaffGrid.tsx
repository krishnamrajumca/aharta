'use client'

import React from 'react'
import StaffCard from './StaffCard'

interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: string
  hireDate: string
  salary: number
  performance: number
  permissions: string[]
  address: string
  emergencyContact: string
  emergencyPhone: string
  skills: string[]
  certifications: string[]
  notes: string
}

interface StaffGridProps {
  staff: StaffMember[]
  onEdit: (memberId: number) => void
  onContact: (memberId: number) => void
  onDelete: (memberId: number) => void
}

export default function StaffGrid({ staff, onEdit, onContact, onDelete }: StaffGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <StaffCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onContact={onContact}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
