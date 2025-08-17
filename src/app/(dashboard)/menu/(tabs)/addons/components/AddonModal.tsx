'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Addon {
  id: number
  name: string
  price: number
  category: string
  status: string
  position: number
  description: string
}

interface AddonModalProps {
  isOpen: boolean
  editingAddon: Addon | null
  onClose: () => void
  onSubmit: () => void
  categories: { id: number; name: string }[]
}

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

export default function AddonModal({ 
  isOpen, 
  editingAddon, 
  onClose, 
  onSubmit, 
  categories 
}: AddonModalProps) {
  if (!isOpen) return null

  const categoryOptions: DropdownOption[] = categories.map(cat => ({
    value: cat.name,
    label: cat.name
  }))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingAddon ? 'Edit Addon' : 'Add New Addon'}
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
            {editingAddon ? 'Update the addon details below' : 'Fill in the details to add a new addon'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Addon Name</label>
              <Input defaultValue={editingAddon?.name || ''} placeholder="Enter addon name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Dropdown
                options={categoryOptions}
                value={editingAddon?.category || ''}
                onChange={(value) => console.log('Category changed:', value)}
                placeholder="Select category"
                searchable
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <Input 
                type="number" 
                step="0.01" 
                defaultValue={editingAddon?.price || ''} 
                placeholder="0.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingAddon?.status || 'active'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Input 
              defaultValue={editingAddon?.description || ''} 
              placeholder="Enter addon description" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <Input 
              type="number" 
              defaultValue={editingAddon?.position || ''} 
              placeholder="Enter display position" 
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
              {editingAddon ? 'Update Addon' : 'Add Addon'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
