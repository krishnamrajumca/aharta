'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Category {
  id: number
  name: string
  count: number
  color: string
  position: number
}

interface CategoryModalProps {
  isOpen: boolean
  editingCategory: Category | null
  selectedColorTheme: string
  onClose: () => void
  onColorThemeChange: (value: string | string[]) => void
  onSubmit: () => void
}

const colorThemeOptions: DropdownOption[] = [
  { value: 'bg-blue-100 text-blue-800', label: 'Blue Theme' },
  { value: 'bg-green-100 text-green-800', label: 'Green Theme' },
  { value: 'bg-purple-100 text-purple-800', label: 'Purple Theme' },
  { value: 'bg-orange-100 text-orange-800', label: 'Orange Theme' },
  { value: 'bg-red-100 text-red-800', label: 'Red Theme' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow Theme' }
]

export default function CategoryModal({ 
  isOpen, 
  editingCategory, 
  selectedColorTheme, 
  onClose, 
  onColorThemeChange, 
  onSubmit 
}: CategoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {editingCategory ? 'Update the category details below' : 'Fill in the details to create a new category'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <Input defaultValue={editingCategory?.name || ''} placeholder="Enter category name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
              <Dropdown
                options={colorThemeOptions}
                value={selectedColorTheme}
                onChange={onColorThemeChange}
                placeholder="Select a color theme"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <Input type="number" defaultValue={editingCategory?.position || ''} placeholder="1" />
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
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
