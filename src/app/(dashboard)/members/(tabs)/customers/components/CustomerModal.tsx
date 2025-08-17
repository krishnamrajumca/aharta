'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  status: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  dateOfBirth: string
  preferences: string[]
  notes: string
  joinDate: string
  customerType: string
  source: string
}

interface CustomerModalProps {
  isOpen: boolean
  editingCustomer: Customer | null
  onClose: () => void
  onSubmit: () => void
}

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'pending', label: 'Pending' }
]

const customerTypeOptions: DropdownOption[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'premium', label: 'Premium' },
  { value: 'vip', label: 'VIP' },
  { value: 'new', label: 'New' }
]

const sourceOptions: DropdownOption[] = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'walk-in', label: 'Walk-in' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'advertising', label: 'Advertising' },
  { value: 'other', label: 'Other' }
]

const preferenceOptions: DropdownOption[] = [
  { value: 'Italian', label: 'Italian' },
  { value: 'Asian', label: 'Asian' },
  { value: 'American', label: 'American' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Spicy', label: 'Spicy' },
  { value: 'Mild', label: 'Mild' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Seafood', label: 'Seafood' },
  { value: 'Meat', label: 'Meat' },
  { value: 'Classic', label: 'Classic' },
  { value: 'Fusion', label: 'Fusion' }
]

export default function CustomerModal({ isOpen, editingCustomer, onClose, onSubmit }: CustomerModalProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    editingCustomer?.preferences || []
  )

  if (!isOpen) return null

  const handlePreferenceToggle = (preference: string) => {
    setSelectedPreferences(prev => {
      if (prev.includes(preference)) {
        return prev.filter(p => p !== preference)
      } else {
        return [...prev, preference]
      }
    })
  }

  const isPreferenceSelected = (preference: string) => {
    return selectedPreferences.includes(preference)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
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
            {editingCustomer ? 'Update the customer details below' : 'Fill in the details to add a new customer'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input defaultValue={editingCustomer?.name || ''} placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" defaultValue={editingCustomer?.email || ''} placeholder="Enter email address" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input defaultValue={editingCustomer?.phone || ''} placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <Input 
                type="date" 
                defaultValue={editingCustomer?.dateOfBirth || ''} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input defaultValue={editingCustomer?.address || ''} placeholder="Enter full address" />
          </div>

          {/* Status and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Dropdown
                options={statusOptions}
                value={editingCustomer?.status || 'active'}
                onChange={(value) => console.log('Status changed:', value)}
                placeholder="Select status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
              <Dropdown
                options={customerTypeOptions}
                value={editingCustomer?.customerType || 'regular'}
                onChange={(value) => console.log('Customer type changed:', value)}
                placeholder="Select customer type"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <Dropdown
                options={sourceOptions}
                value={editingCustomer?.source || 'website'}
                onChange={(value) => console.log('Source changed:', value)}
                placeholder="Select source"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <Input 
                type="date" 
                defaultValue={editingCustomer?.joinDate || new Date().toISOString().split('T')[0]} 
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Food Preferences</h3>
              <span className="text-sm text-gray-500">
                {selectedPreferences.length} selected
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {preferenceOptions.map((preference) => (
                <div
                  key={preference.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    isPreferenceSelected(preference.value)
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePreferenceToggle(preference.value)}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    isPreferenceSelected(preference.value)
                      ? 'border-green-600 bg-green-600'
                      : 'border-gray-300'
                  }`}>
                    {isPreferenceSelected(preference.value) && (
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {preference.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <Input 
              defaultValue={editingCustomer?.notes || ''} 
              placeholder="Enter any special notes or preferences" 
            />
          </div>

          {/* Initial Values (for new customers) */}
          {!editingCustomer && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Orders</label>
                <Input 
                  type="number" 
                  defaultValue="0" 
                  placeholder="0" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Spending</label>
                <Input 
                  type="number" 
                  step="0.01" 
                  defaultValue="0.00" 
                  placeholder="0.00" 
                />
              </div>
            </div>
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
              {editingCustomer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
