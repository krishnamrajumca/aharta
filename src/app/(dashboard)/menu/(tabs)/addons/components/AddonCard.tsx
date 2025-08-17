'use client'

import React from 'react'
import { Tag, Edit, Trash2, GripVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Addon {
  id: number
  name: string
  price: number
  category: string
  status: string
  position: number
  description: string
}

interface AddonCardProps {
  addon: Addon
  onEdit: (addon: Addon) => void
  onDelete: (addon: Addon) => void
  onDragStart: (e: React.DragEvent, addon: Addon) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, addon: Addon) => void
}

export default function AddonCard({ 
  addon, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: AddonCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, addon)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, addon)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Tag className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(addon)}
              className="p-1 h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(addon)}
              className="p-1 h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Category</span>
              <span className="text-sm font-medium text-gray-900">{addon.category}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(addon.price)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(addon.status)}`}>
                {addon.status.charAt(0).toUpperCase() + addon.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Position</span>
              <span className="text-sm font-medium text-gray-900">#{addon.position}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
