'use client'

import React from 'react'
import MenuItemCard from './MenuItemCard'

interface Serving {
  id: number
  name: string
  description: string
  size: string
  people: string
  includes: string[]
  addonCategories: Array<{
    categoryId: number
    name: string
    required: boolean
    minSelection: number
    maxSelection: number
    addons: number[]
  }>
}

interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  type: 'simple' | 'complex'
  price: number
  cost: number
  image: string
  status: string
  preparationTime: string
  allergens: string[]
  tags: string[]
  stock: number
  position: number
  servings?: Serving[]
}

interface ItemsGridProps {
  items: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (itemId: number) => void
  onDragStart: (e: React.DragEvent, item: MenuItem) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, item: MenuItem) => void
}

export default function ItemsGrid({ 
  items, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: ItemsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
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
