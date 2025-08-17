'use client'

import React from 'react'
import { Users, Edit, Mail, Phone, Calendar, MapPin, DollarSign, Star, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

interface StaffCardProps {
  member: StaffMember
  onEdit: (memberId: number) => void
  onContact: (memberId: number) => void
  onDelete: (memberId: number) => void
}

export default function StaffCard({ member, onEdit, onContact, onDelete }: StaffCardProps) {
  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      on_leave: 'bg-yellow-100 text-yellow-800',
      terminated: 'bg-red-100 text-red-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  const getPermissionLevel = (permissions: string[]) => {
    if (permissions.includes('all')) return 'Full Access'
    if (permissions.length > 5) return 'High Access'
    if (permissions.length > 2) return 'Medium Access'
    return 'Basic Access'
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 80) return 'text-blue-600'
    if (performance >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        {/* Header with Status and Performance */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
              {member.status}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(member.performance)} bg-gray-100`}>
              {member.performance}%
            </span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{member.role} • {member.department}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {member.hireDate}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              ${member.salary.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            {member.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {member.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{member.address}</span>
          </div>
        </div>

        {/* Skills and Permissions */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Shield className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{getPermissionLevel(member.permissions)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{member.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(member.id)}
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContact(member.id)}
            className="flex-1"
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
