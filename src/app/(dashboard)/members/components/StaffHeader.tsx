'use client'

import React from 'react'
import { Plus, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StaffHeaderProps {
  onAddStaff: () => void
  onExport: () => void
  onImport: () => void
}

export default function StaffHeader({ onAddStaff, onExport, onImport }: StaffHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
        <p className="text-gray-600">Manage your restaurant staff, roles, and permissions</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={onImport}>
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={onAddStaff} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>
    </div>
  )
}
