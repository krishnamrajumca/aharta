'use client'

import React from 'react'
import { Edit, Trash2, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

interface MenuItemCardProps {
  item: MenuItem
  onEdit: (item: MenuItem) => void
  onDelete: (itemId: number) => void
  onDragStart: (e: React.DragEvent, item: MenuItem) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, item: MenuItem) => void
}

export default function MenuItemCard({ 
  item, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: MenuItemCardProps) {
  const getProfitMargin = (price: number, cost: number) => {
    return Math.round(((price - cost) / price) * 100)
  }

  return (
    <Card 
      className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, item)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            item.type === 'complex' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {item.type === 'complex' ? 'Complex Item' : 'Simple Item'}
          </span>
        </div>

        {/* Complex Item Specific Info */}
        {item.type === 'complex' && item.servings && (
          <div className="mb-3 p-2 bg-purple-50 rounded-md">
            <div className="flex items-center text-sm text-purple-700 mb-1">
              <Users className="h-4 w-4 mr-1" />
              {item.servings.length} Serving{item.servings.length !== 1 ? 's' : ''}
            </div>
            <div className="text-xs text-purple-600">
              {item.servings.map((serving, index) => (
                <div key={serving.id} className="mb-1">
                  <strong>{serving.name}</strong>: {serving.people}
                  {serving.addonCategories?.length > 0 && (
                    <span className="text-purple-500 ml-1">
                      • {serving.addonCategories.length} addon option{serving.addonCategories.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-green-600">${item.price}</span>
          <span className="text-xs text-gray-400">Pos: {item.position}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Category: {item.category}</span>
          <span>Stock: {item.stock}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Prep: {item.preparationTime}</span>
          <span>Margin: {getProfitMargin(item.price, item.cost)}%</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.map(tag => (
            <span key={tag} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {item.allergens.map(allergen => (
            <span key={allergen} className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              {allergen}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
