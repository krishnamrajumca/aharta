'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoriesHeaderProps {
  onAddCategory: () => void
}

export default function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Menu Categories</h2>
        <p className="text-gray-600 mt-1">Organize your menu into logical categories</p>
      </div>
      <Button onClick={onAddCategory} className="bg-green-600 hover:bg-green-700">
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  )
}
