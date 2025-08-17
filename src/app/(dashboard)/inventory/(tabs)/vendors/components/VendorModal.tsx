'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Vendor {
  id: number
  name: string
  type: string
  contactPerson: string
  email: string
  phone: string
  website: string
  address: string
  status: string
  rating: number
  totalOrders: number
  totalSpent: number
  lastOrder: string
  paymentTerms: string
  categories: string[]
  performance: string
  leadTime: number
  minOrder: number
}

interface VendorModalProps {
  isOpen: boolean
  editingVendor: Vendor | null
  onClose: () => void
  onSubmit: () => void
}

const vendorTypeOptions: DropdownOption[] = [
  { value: 'Beverage Supplier', label: 'Beverage Supplier' },
  { value: 'Dairy Supplier', label: 'Dairy Supplier' },
  { value: 'Produce Supplier', label: 'Produce Supplier' },
  { value: 'Bakery Supplier', label: 'Bakery Supplier' },
  { value: 'Meat Supplier', label: 'Meat Supplier' },
  { value: 'Pantry Supplier', label: 'Pantry Supplier' },
  { value: 'Cleaning Supplier', label: 'Cleaning Supplier' },
  { value: 'Equipment Supplier', label: 'Equipment Supplier' }
]

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'pending', label: 'Pending' }
]

const performanceOptions: DropdownOption[] = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'poor', label: 'Poor' }
]

const paymentTermsOptions: DropdownOption[] = [
  { value: 'Net 15', label: 'Net 15' },
  { value: 'Net 30', label: 'Net 30' },
  { value: 'Net 45', label: 'Net 45' },
  { value: 'Net 60', label: 'Net 60' },
  { value: 'Cash on Delivery', label: 'Cash on Delivery' },
  { value: 'Advance Payment', label: 'Advance Payment' }
]

export default function VendorModal({ isOpen, editingVendor, onClose, onSubmit }: VendorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
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
            {editingVendor ? 'Update the vendor details below' : 'Fill in the details to add a new vendor'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
              <Input defaultValue={editingVendor?.name || ''} placeholder="Enter vendor name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Type</label>
              <Dropdown
                options={vendorTypeOptions}
                value={editingVendor?.type || ''}
                onChange={(value) => console.log('Vendor type changed:', value)}
                placeholder="Select vendor type"
                searchable
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <Input defaultValue={editingVendor?.contactPerson || ''} placeholder="Enter contact person name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" defaultValue={editingVendor?.email || ''} placeholder="Enter email address" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input defaultValue={editingVendor?.phone || ''} placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <Input defaultValue={editingVendor?.website || ''} placeholder="Enter website URL" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input defaultValue={editingVendor?.address || ''} placeholder="Enter full address" />
          </div>

          {/* Status and Performance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingVendor?.status || 'active'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Performance Rating</label>
              <Dropdown
                options={performanceOptions}
                value={editingVendor?.performance || 'good'}
                onChange={(value) => console.log('Performance changed:', value)}
                placeholder="Select performance"
              />
            </div>
          </div>

          {/* Business Terms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
              <Dropdown
                options={paymentTermsOptions}
                value={editingVendor?.paymentTerms || 'Net 30'}
                onChange={(value) => console.log('Payment terms changed:', value)}
                placeholder="Select payment terms"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
              <Input 
                type="number" 
                defaultValue={editingVendor?.leadTime || ''} 
                placeholder="Enter lead time in days" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order ($)</label>
            <Input 
              type="number" 
              step="0.01" 
              defaultValue={editingVendor?.minOrder || ''} 
              placeholder="Enter minimum order amount" 
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
            <Input 
              defaultValue={editingVendor?.categories?.join(', ') || ''} 
              placeholder="e.g., Beverages, Coffee, Tea (comma separated)" 
            />
          </div>

          {/* Initial Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Rating</label>
            <Input 
              type="number" 
              step="0.1" 
              min="0" 
              max="5" 
              defaultValue={editingVendor?.rating || '4.0'} 
              placeholder="Enter rating (0-5)" 
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
              {editingVendor ? 'Update Vendor' : 'Add Vendor'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
