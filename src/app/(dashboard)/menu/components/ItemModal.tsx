'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'
import ItemTypeSelector from './ItemTypeSelector'
import ServingConfig from './ServingConfig'

interface Serving {
  id: number
  name: string
  size: string
  addonCategories: Array<{
    categoryId: number
    name: string
    required: boolean
    minSelection: number
    maxSelection: number
    addons: number[]
  }>
  isExpanded?: boolean // Optional for accordion functionality
}

interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  type: 'simple' | 'complex'
  price: number
  cost: number
  image: string
  status: string
  preparationTime: string
  allergens: string[]
  tags: string[]
  stock: number
  position: number
  servings?: Serving[]
}

interface ItemModalProps {
  isOpen: boolean
  editingItem: MenuItem | null
  selectedItemType: 'simple' | 'complex'
  servings: Serving[]
  onClose: () => void
  onItemTypeChange: (type: 'simple' | 'complex') => void
  onAddServing: () => void
  onEditServing: (serving: Serving) => void
  onDeleteServing: (servingId: number) => void
  onUpdateServing: (servingId: number, updates: Partial<Serving>) => void
  onSubmit: () => void
}

const menuCategories = [
  { id: 1, name: 'Appetizers', count: 12, color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Main Courses', count: 24, color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Desserts', count: 8, color: 'bg-purple-100 text-purple-800' },
  { id: 4, name: 'Beverages', count: 15, color: 'bg-orange-100 text-orange-800' },
  { id: 5, name: 'Sides', count: 18, color: 'bg-red-100 text-red-800' },
  { id: 6, name: 'Specials', count: 6, color: 'bg-yellow-100 text-yellow-800' }
]

export default function ItemModal({ 
  isOpen, 
  editingItem, 
  selectedItemType, 
  servings, 
  onClose, 
  onItemTypeChange, 
  onAddServing, 
  onEditServing, 
  onDeleteServing, 
  onUpdateServing, 
  onSubmit 
}: ItemModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Item Type Selection */}
          <ItemTypeSelector
            selectedType={selectedItemType}
            onTypeChange={onItemTypeChange}
          />

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <Input defaultValue={editingItem?.name || ''} placeholder="Enter item name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Dropdown
                options={menuCategories.map(cat => ({ value: cat.name, label: cat.name }))}
                value={editingItem?.category || ''}
                onChange={(value) => console.log('Category changed:', value)}
                placeholder="Select category"
                searchable
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
              placeholder="Enter item description"
              defaultValue={editingItem?.description || ''}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <Input 
                type="number" 
                step="0.01" 
                defaultValue={editingItem?.price || ''} 
                placeholder="0.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
              <Input 
                type="number" 
                step="0.01" 
                defaultValue={editingItem?.cost || ''} 
                placeholder="0.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <Input 
                type="number" 
                defaultValue={editingItem?.stock || ''} 
                placeholder="0" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>
              <Input 
                defaultValue={editingItem?.preparationTime || ''} 
                placeholder="e.g., 25 min" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <Input 
                type="number" 
                defaultValue={editingItem?.position || ''} 
                placeholder="1" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <Input 
              defaultValue={editingItem?.tags?.join(', ') || ''} 
              placeholder="e.g., Popular, Chef Special (comma separated)" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergens</label>
            <Input 
              defaultValue={editingItem?.allergens?.join(', ') || ''} 
              placeholder="e.g., Dairy, Gluten (comma separated)" 
            />
          </div>

          {/* Complex Item Specific Fields */}
          {selectedItemType === 'complex' && (
            <ServingConfig
              servings={servings}
              onAddServing={onAddServing}
              onEditServing={onEditServing}
              onDeleteServing={onDeleteServing}
              onUpdateServing={onUpdateServing}
            />
          )}
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
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
