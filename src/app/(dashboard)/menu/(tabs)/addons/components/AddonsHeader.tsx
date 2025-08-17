'use client'

import React from 'react'
import { Plus, FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AddonsHeaderProps {
  onAddAddon: () => void
  onAddCategory: () => void
}

export default function AddonsHeader({ onAddAddon, onAddCategory }: AddonsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Addon Management</h2>
        <p className="text-gray-600">Manage menu addons, toppings, sides, and condiments</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={onAddCategory} className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
        <Button onClick={onAddAddon} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Addon
        </Button>
      </div>
    </div>
  )
}
