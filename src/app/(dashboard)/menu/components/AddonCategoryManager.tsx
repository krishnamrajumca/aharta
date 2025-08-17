'use client'

import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown } from '@/components/ui/dropdown'

interface AddonCategory {
  id: number
  name: string
  required: boolean
  minSelection: number
  maxSelection: number
  addons: number[]
}

interface AddonCategoryManagerProps {
  addonCategories: AddonCategory[]
  onAddCategory: () => void
  onUpdateCategory: (categoryId: number, updates: Partial<AddonCategory>) => void
  onDeleteCategory: (categoryId: number) => void
  title?: string
  description?: string
}

export default function AddonCategoryManager({
  addonCategories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  title = "Addon Categories",
  description = "Configure addon options for this item"
}: AddonCategoryManagerProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-4">
        {/* Add Addon Category Button */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800">Addon Categories</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddCategory}
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          >
            + Add Addon Category
          </Button>
        </div>
        
        {/* Addon Categories List */}
        {addonCategories && addonCategories.length > 0 ? (
          <div className="space-y-3">
            {addonCategories.map((addonCategory, categoryIndex) => (
              <div key={addonCategory.id} className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Addon Category</label>
                    <Dropdown
                      options={[
                        { value: 'toppings', label: 'Toppings' },
                        { value: 'sides', label: 'Sides' },
                        { value: 'condiments', label: 'Condiments' },
                        { value: 'beverages', label: 'Beverages' },
                        { value: 'desserts', label: 'Desserts' },
                        { value: 'extras', label: 'Extras' },
                        { value: 'sauces', label: 'Sauces' },
                        { value: 'cheese', label: 'Cheese' }
                      ]}
                      value={addonCategory.name}
                      onChange={(value) => {
                        onUpdateCategory(addonCategory.id, {
                          name: Array.isArray(value) ? value[0] : value
                        })
                      }}
                      placeholder="Select category"
                      className="w-full relative z-20"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteCategory(addonCategory.id)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Required</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={addonCategory.required}
                        onChange={(e) => {
                          onUpdateCategory(addonCategory.id, {
                            required: e.target.checked
                          })
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">Required</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Selection Limits</label>
                    <div className="flex items-center space-x-1">
                      <Input
                        type="number"
                        min="0"
                        value={addonCategory.minSelection}
                        onChange={(e) => {
                          onUpdateCategory(addonCategory.id, {
                            minSelection: parseInt(e.target.value) || 0
                          })
                        }}
                        className="w-12 h-6 text-xs"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-xs">to</span>
                      <Input
                        type="number"
                        min="1"
                        value={addonCategory.maxSelection}
                        onChange={(e) => {
                          onUpdateCategory(addonCategory.id, {
                            maxSelection: parseInt(e.target.value) || 1
                          })
                        }}
                        className="w-12 h-6 text-xs"
                        placeholder="∞"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            <p>No addon categories configured yet</p>
            <p>Click "Add Addon Category" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
