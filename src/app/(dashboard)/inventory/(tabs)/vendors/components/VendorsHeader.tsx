'use client'

import React from 'react'
import { Plus, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VendorsHeaderProps {
  onAddVendor: () => void
  onExport: () => void
  onImport: () => void
}

export default function VendorsHeader({ onAddVendor, onExport, onImport }: VendorsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vendor Management</h2>
        <p className="text-gray-600">Manage your suppliers and vendor relationships</p>
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
        <Button onClick={onAddVendor} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>
    </div>
  )
}
