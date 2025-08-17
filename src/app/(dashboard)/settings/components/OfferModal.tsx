'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Offer {
  id: number
  name: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  validFrom: string
  validUntil: string
  daysOfWeek: string[]
  timeFrom: string
  timeTo: string
  status: 'active' | 'inactive'
  minimumOrder: number
  maximumDiscount: number
}

interface OfferModalProps {
  isOpen: boolean
  editingOffer: Offer | null
  onClose: () => void
  onSubmit: (offerData: Partial<Offer>) => void
}

const discountTypeOptions: DropdownOption[] = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed Amount ($)' }
]

export default function OfferModal({ isOpen, editingOffer, onClose, onSubmit }: OfferModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const offerData = {
      name: formData.get('name') as string,
      discountType: formData.get('discountType') as 'percentage' | 'fixed',
      discountValue: parseFloat(formData.get('discountValue') as string),
      status: formData.get('status') as 'active' | 'inactive',
      validFrom: formData.get('validFrom') as string,
      validUntil: formData.get('validUntil') as string,
      timeFrom: formData.get('timeFrom') as string,
      timeTo: formData.get('timeTo') as string,
      description: formData.get('description') as string,
      minimumOrder: parseFloat(formData.get('minimumOrder') as string),
      maximumDiscount: parseFloat(formData.get('maximumDiscount') as string),
    }
    onSubmit(offerData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingOffer ? 'Edit Offer' : 'Add New Offer'}
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
        <form onSubmit={handleSubmit}>
          <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Name</label>
                <Input 
                  name="name"
                  defaultValue={editingOffer?.name || ''} 
                  placeholder="Enter offer name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <Dropdown
                  name="discountType"
                  options={discountTypeOptions}
                  value={editingOffer?.discountType || 'percentage'}
                  onChange={(value) => console.log('Discount type changed:', value)}
                  placeholder="Select discount type"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                <Input 
                  name="discountValue"
                  type="number" 
                  step="0.01" 
                  defaultValue={editingOffer?.discountValue || ''} 
                  placeholder="0.00" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Dropdown
                  name="status"
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' }
                  ]}
                  value={editingOffer?.status || 'active'}
                  onChange={(value) => console.log('Status changed:', value)}
                  placeholder="Select status"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                <Input 
                  name="validFrom"
                  type="date" 
                  defaultValue={editingOffer?.validFrom || ''} 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                <Input 
                  name="validUntil"
                  type="date" 
                  defaultValue={editingOffer?.validUntil || ''} 
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time From</label>
                <Input 
                  name="timeFrom"
                  type="time" 
                  defaultValue={editingOffer?.timeFrom || ''} 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time To</label>
                <Input 
                  name="timeTo"
                  type="time" 
                  defaultValue={editingOffer?.timeTo || ''} 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                placeholder="Enter offer description"
                defaultValue={editingOffer?.description || ''}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order</label>
                <Input 
                  name="minimumOrder"
                  type="number" 
                  step="0.01" 
                  defaultValue={editingOffer?.minimumOrder || ''} 
                  placeholder="0.00" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Discount</label>
                <Input 
                  name="maximumDiscount"
                  type="number" 
                  step="0.01" 
                  defaultValue={editingOffer?.maximumDiscount || ''} 
                  placeholder="0.00" 
                  required
                />
              </div>
            </div>
          </CardContent>
          <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingOffer ? 'Update Offer' : 'Add Offer'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
