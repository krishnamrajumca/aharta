'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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

interface StaffModalProps {
  isOpen: boolean
  editingMember: StaffMember | null
  onClose: () => void
  onSubmit: () => void
}

const departmentOptions: DropdownOption[] = [
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Service', label: 'Service' },
  { value: 'Management', label: 'Management' },
  { value: 'Bar', label: 'Bar' },
  { value: 'Host', label: 'Host' },
  { value: 'Maintenance', label: 'Maintenance' }
]

const roleOptions: DropdownOption[] = [
  { value: 'Chef', label: 'Chef' },
  { value: 'Server', label: 'Server' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Bartender', label: 'Bartender' },
  { value: 'Host', label: 'Host' },
  { value: 'Maintenance', label: 'Maintenance' }
]

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
  { value: 'terminated', label: 'Terminated' }
]

export default function StaffModal({ isOpen, editingMember, onClose, onSubmit }: StaffModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingMember ? 'Edit Staff Member' : 'Add New Staff Member'}
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
            {editingMember ? 'Update the staff member details below' : 'Fill in the details to add a new staff member'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input defaultValue={editingMember?.name || ''} placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" defaultValue={editingMember?.email || ''} placeholder="Enter email address" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input defaultValue={editingMember?.phone || ''} placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Dropdown
                options={departmentOptions}
                value={editingMember?.department || ''}
                onChange={(value) => console.log('Department changed:', value)}
                placeholder="Select department"
                searchable
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <Dropdown
                options={roleOptions}
                value={editingMember?.role || ''}
                onChange={(value) => console.log('Role changed:', value)}
                placeholder="Select role"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingMember?.status || 'active'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
              <Input type="date" defaultValue={editingMember?.hireDate || ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary ($)</label>
              <Input 
                type="number" 
                step="1000" 
                defaultValue={editingMember?.salary || ''} 
                placeholder="Enter annual salary" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input defaultValue={editingMember?.address || ''} placeholder="Enter full address" />
          </div>

          {/* Emergency Contact */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <Input defaultValue={editingMember?.emergencyContact || ''} placeholder="Enter emergency contact name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <Input defaultValue={editingMember?.emergencyPhone || ''} placeholder="Enter emergency contact phone" />
              </div>
            </div>
          </div>

          {/* Skills and Certifications */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Skills & Certifications</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <Input 
                  defaultValue={editingMember?.skills?.join(', ') || ''} 
                  placeholder="e.g., Cooking, Leadership, Food Safety (comma separated)" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                <Input 
                  defaultValue={editingMember?.certifications?.join(', ') || ''} 
                  placeholder="e.g., Food Handler, ServSafe (comma separated)" 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
              placeholder="Enter any additional notes about this staff member"
              defaultValue={editingMember?.notes || ''}
            />
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
              {editingMember ? 'Update Staff Member' : 'Add Staff Member'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
