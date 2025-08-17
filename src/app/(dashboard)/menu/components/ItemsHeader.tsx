'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ItemsHeaderProps {
  onAddItem: () => void
}

export default function ItemsHeader({ onAddItem }: ItemsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
        <p className="text-gray-600">Manage your menu items and pricing</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button onClick={onAddItem} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  )
}
