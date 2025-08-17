'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddonCategory {
  id: number
  name: string
  description: string
  status: string
}

interface CategoryModalProps {
  isOpen: boolean
  editingCategory: AddonCategory | null
  onClose: () => void
  onSubmit: () => void
}

export default function CategoryModal({ 
  isOpen, 
  editingCategory, 
  onClose, 
  onSubmit 
}: CategoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
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
            {editingCategory ? 'Update the category details below' : 'Fill in the details to add a new category'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <Input defaultValue={editingCategory?.name || ''} placeholder="Enter category name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Input 
              defaultValue={editingCategory?.description || ''} 
              placeholder="Enter category description" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              defaultValue={editingCategory?.status || 'active'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={onSubmit}>
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
