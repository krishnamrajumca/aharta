'use client'

import React from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

interface TaxesSettingsProps {
  taxes: Tax[]
  onAddTax: () => void
  onEditTax: (tax: Tax) => void
  onDeleteTax: (taxId: number) => void
}

export default function TaxesSettings({ taxes, onAddTax, onEditTax, onDeleteTax }: TaxesSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax Management</h2>
          <p className="text-gray-600">Configure tax rates and rules for your business</p>
        </div>
        <Button onClick={onAddTax} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Tax
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxes.map((tax) => (
          <Card key={tax.id} className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tax.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditTax(tax)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTax(tax.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{tax.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {tax.type === 'percentage' ? `${tax.rate}%` : `$${tax.rate}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{tax.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  tax.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Effective Date</span>
                <span className="text-sm font-medium text-gray-900">{tax.effectiveDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
