'use client'

import React from 'react'
import CategoryCard from './CategoryCard'

interface Category {
  id: number
  name: string
  count: number
  color: string
  position: number
}

interface CategoriesGridProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (categoryId: number) => void
  onDragStart: (e: React.DragEvent, category: Category) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, category: Category) => void
}

export default function CategoriesGrid({ 
  categories, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  )
}
