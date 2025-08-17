'use client'

import React from 'react'
import { Menu, Edit, Trash2, GripVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Category {
  id: number
  name: string
  count: number
  color: string
  position: number
}

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (categoryId: number) => void
  onDragStart: (e: React.DragEvent, category: Category) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, category: Category) => void
}

export default function CategoryCard({ 
  category, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: CategoryCardProps) {
  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, category)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
              <Menu className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(category)}
              className="p-1 h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(category.id)}
              className="p-1 h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.count} items</p>
          <div className="mt-2 text-xs text-gray-400">Position: {category.position}</div>
        </div>
      </CardContent>
    </Card>
  )
}
