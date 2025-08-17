'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Tax {
  id: number
  name: string
  rate: number
  type: 'percentage' | 'fixed'
  description: string
  status: 'active' | 'inactive'
  appliesTo: string[]
  effectiveDate: string
}

interface TaxModalProps {
  isOpen: boolean
  editingTax: Tax | null
  onClose: () => void
  onSubmit: (taxData: Partial<Tax>) => void
}

const taxTypeOptions: DropdownOption[] = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed Amount ($)' }
]

export default function TaxModal({ isOpen, editingTax, onClose, onSubmit }: TaxModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const taxData = {
      name: formData.get('name') as string,
      type: formData.get('type') as 'percentage' | 'fixed',
      rate: parseFloat(formData.get('rate') as string),
      status: formData.get('status') as 'active' | 'inactive',
      description: formData.get('description') as string,
      effectiveDate: formData.get('effectiveDate') as string,
    }
    onSubmit(taxData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            {editingTax ? 'Edit Tax' : 'Add New Tax'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Name</label>
                <Input 
                  name="name"
                  defaultValue={editingTax?.name || ''} 
                  placeholder="Enter tax name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type</label>
                <Dropdown
                  name="type"
                  options={taxTypeOptions}
                  value={editingTax?.type || 'percentage'}
                  onChange={(value) => console.log('Tax type changed:', value)}
                  placeholder="Select tax type"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                <Input 
                  name="rate"
                  type="number" 
                  step="0.01" 
                  defaultValue={editingTax?.rate || ''} 
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
                  value={editingTax?.status || 'active'}
                  onChange={(value) => console.log('Status changed:', value)}
                  placeholder="Select status"
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
                placeholder="Enter tax description"
                defaultValue={editingTax?.description || ''}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
              <Input 
                name="effectiveDate"
                type="date" 
                defaultValue={editingTax?.effectiveDate || ''} 
                required
              />
            </div>
          </CardContent>
          <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingTax ? 'Update Tax' : 'Add Tax'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
