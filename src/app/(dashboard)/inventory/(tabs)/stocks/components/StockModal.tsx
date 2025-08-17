'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface StockItem {
  id: number
  name: string
  category: string
  sku: string
  quantity: number
  unit: string
  price: number
  cost: number
  supplier: string
  status: string
  reorderPoint: number
  lastUpdated: string
  location: string
  expiryDate: string
  minOrder: number
  leadTime: number
}

interface StockModalProps {
  isOpen: boolean
  editingItem: StockItem | null
  onClose: () => void
  onSubmit: () => void
}

const categoryOptions: DropdownOption[] = [
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Produce', label: 'Produce' },
  { value: 'Meat', label: 'Meat' },
  { value: 'Pantry', label: 'Pantry' },
  { value: 'Frozen', label: 'Frozen' },
  { value: 'Cleaning', label: 'Cleaning' }
]

const unitOptions: DropdownOption[] = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'g', label: 'Grams (g)' },
  { value: 'L', label: 'Liters (L)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'pieces', label: 'Pieces' },
  { value: 'dozen', label: 'Dozen' },
  { value: 'loaves', label: 'Loaves' },
  { value: 'boxes', label: 'Boxes' }
]

const statusOptions: DropdownOption[] = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-stock', label: 'Low Stock' },
  { value: 'critical', label: 'Critical' },
  { value: 'out-of-stock', label: 'Out of Stock' }
]

const locationOptions: DropdownOption[] = [
  { value: 'Warehouse A', label: 'Warehouse A' },
  { value: 'Warehouse B', label: 'Warehouse B' },
  { value: 'Cold Storage', label: 'Cold Storage' },
  { value: 'Freezer', label: 'Freezer' },
  { value: 'Dry Storage', label: 'Dry Storage' },
  { value: 'Kitchen', label: 'Kitchen' }
]

export default function StockModal({ isOpen, editingItem, onClose, onSubmit }: StockModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingItem ? 'Edit Stock Item' : 'Add New Stock Item'}
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
            {editingItem ? 'Update the stock item details below' : 'Fill in the details to add a new stock item'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <Input defaultValue={editingItem?.name || ''} placeholder="Enter item name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <Input defaultValue={editingItem?.sku || ''} placeholder="Enter SKU code" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Dropdown
                options={categoryOptions}
                value={editingItem?.category || ''}
                onChange={(value) => console.log('Category changed:', value)}
                placeholder="Select category"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <Dropdown
                options={unitOptions}
                value={editingItem?.unit || ''}
                onChange={(value) => console.log('Unit changed:', value)}
                placeholder="Select unit"
              />
            </div>
          </div>

          {/* Stock Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Quantity</label>
              <Input 
                type="number" 
                defaultValue={editingItem?.quantity || ''} 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
              <Input 
                type="number" 
                defaultValue={editingItem?.reorderPoint || ''} 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order</label>
              <Input 
                type="number" 
                defaultValue={editingItem?.minOrder || ''} 
                placeholder="0" 
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($)</label>
              <Input 
                type="number" 
                step="0.01" 
                defaultValue={editingItem?.price || ''} 
                placeholder="0.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price ($)</label>
              <Input 
                type="number" 
                step="0.01" 
                defaultValue={editingItem?.cost || ''} 
                placeholder="0.00" 
              />
            </div>
          </div>

          {/* Supplier and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <Input defaultValue={editingItem?.supplier || ''} placeholder="Enter supplier name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Dropdown
                options={locationOptions}
                value={editingItem?.location || ''}
                onChange={(value) => console.log('Location changed:', value)}
                placeholder="Select location"
                searchable
              />
            </div>
          </div>

          {/* Status and Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingItem?.status || 'in-stock'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <Input 
                type="date" 
                defaultValue={editingItem?.expiryDate || ''} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
            <Input 
              type="number" 
              defaultValue={editingItem?.leadTime || ''} 
              placeholder="Enter lead time in days" 
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
              {editingItem ? 'Update Stock Item' : 'Add Stock Item'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
