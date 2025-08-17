'use client'

import React from 'react'
import { Tag, Package } from 'lucide-react'

interface ItemTypeSelectorProps {
  selectedType: 'simple' | 'complex'
  onTypeChange: (type: 'simple' | 'complex') => void
}

export default function ItemTypeSelector({ selectedType, onTypeChange }: ItemTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
      <div className="grid grid-cols-2 gap-4">
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedType === 'simple' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onTypeChange('simple')}
        >
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Simple Item</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Basic menu item with standard pricing</p>
        </div>
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedType === 'complex' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onTypeChange('complex')}
        >
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Complex Item</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Item with multiple servings and customizable addons</p>
        </div>
      </div>
    </div>
  )
}
