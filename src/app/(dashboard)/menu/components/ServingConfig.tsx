'use client'

import React, { useState } from 'react'
import { Users, Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown } from '@/components/ui/dropdown'

interface Serving {
  id: number
  name: string
  size: string
  position?: number
  addonCategories: Array<{
    categoryId: number
    name: string
    required: boolean
    minSelection: number
    maxSelection: number
    addons: number[]
  }>
  isExpanded?: boolean
}

interface ServingConfigProps {
  servings: Serving[]
  onAddServing: () => void
  onEditServing: (serving: Serving) => void
  onDeleteServing: (servingId: number) => void
  onUpdateServing: (servingId: number, updates: Partial<Serving>) => void
  onReorderServings?: (newOrder: Serving[]) => void
}

export default function ServingConfig({ 
  servings, 
  onAddServing, 
  onEditServing, 
  onDeleteServing, 
  onUpdateServing, 
  onReorderServings 
}: ServingConfigProps) {
  const [draggedServing, setDraggedServing] = useState<any>(null)

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, serving: any) => {
    setDraggedServing(serving)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', serving.id.toString())
    console.log('Drag started for serving:', serving.name)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetServing: any) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (draggedServing && draggedServing.id !== targetServing.id) {
      console.log('Dropping', draggedServing.name, 'onto', targetServing.name)
      
      const draggedIndex = servings.findIndex(s => s.id === draggedServing.id)
      const targetIndex = servings.findIndex(s => s.id === targetServing.id)
      
      // Create new array with reordered servings
      const newServings = [...servings]
      const [removed] = newServings.splice(draggedIndex, 1)
      newServings.splice(targetIndex, 0, removed)
      
      console.log('New order:', newServings.map(s => s.name))
      
      // Use the reorder callback if available, otherwise update positions
      if (onReorderServings) {
        onReorderServings(newServings)
      } else {
        // Fallback: Update all servings with new order
        newServings.forEach((serving, index) => {
          onUpdateServing(serving.id, { position: index + 1 })
        })
      }
    }
    setDraggedServing(null)
  }

  const handleDragEnd = () => {
    setDraggedServing(null)
    console.log('Drag ended')
  }

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-900 flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-600" />
          Servings Configuration
        </h4>
        <Button
          onClick={onAddServing}
          variant="outline"
          size="sm"
          className="text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Serving
        </Button>
      </div>

      {servings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No servings configured yet</p>
          <p className="text-sm">Click "Add Serving" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {servings.map((serving, index) => (
            <div
              key={serving.id}
              draggable
              onDragStart={(e) => handleDragStart(e, serving)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, serving)}
              onDragEnd={handleDragEnd}
              className={`border border-gray-200 rounded-lg bg-gray-50 overflow-hidden transition-all duration-200 ${
                draggedServing?.id === serving.id 
                  ? 'opacity-50 scale-95 shadow-lg' 
                  : 'hover:shadow-md'
              } ${
                draggedServing && draggedServing.id !== serving.id ? 'border-dashed border-blue-300' : ''
              }`}
            >
              {/* Serving Header - Clickable for expand/collapse */}
              <button
                onClick={() => {
                  const updatedServings = [...servings]
                  updatedServings[index] = {
                    ...serving,
                    isExpanded: !(serving.isExpanded ?? false)
                  }
                  onUpdateServing(serving.id, { isExpanded: !(serving.isExpanded ?? false) })
                }}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-1 hover:bg-gray-200 rounded cursor-move"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <h5 className="font-medium text-gray-900">Serving {index + 1}: {serving.name}</h5>
                  <span className="text-sm text-gray-500">
                    {serving.addonCategories?.length || 0} addon categories
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteServing(serving.id)
                    }}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {(serving.isExpanded ?? false) ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Serving Content - Expandable */}
              {(serving.isExpanded ?? false) && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Serving Name</label>
                      <Input
                        value={serving.name}
                        onChange={(e) => onUpdateServing(serving.id, { name: e.target.value })}
                        placeholder="e.g., Main Pizza, Side Dish"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                      <Input
                        value={serving.size}
                        onChange={(e) => onUpdateServing(serving.id, { size: e.target.value })}
                        placeholder="e.g., Large, Medium, Small"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-4">
                    <span className="font-medium">Addon Categories:</span> {serving.addonCategories.length}
                    {serving.addonCategories.length > 0 && (
                      <span className="ml-2">
                        ({serving.addonCategories.map(ac => ac.name).join(', ')})
                      </span>
                    )}
                  </div>

                  {/* Addon Configuration - Integrated under each serving */}
                  <div className="mt-4 pt-4 border-t border-gray-200 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h6 className="font-medium text-gray-800 text-sm">Addon Categories</h6>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newAddonCategory = {
                            categoryId: Date.now(), // Temporary ID
                            name: '', // Will be selected from dropdown
                            required: false,
                            minSelection: 0,
                            maxSelection: 3,
                            addons: []
                          }
                          
                          const updatedAddonCategories = [
                            ...(serving.addonCategories || []),
                            newAddonCategory
                          ]
                          
                          onUpdateServing(serving.id, {
                            addonCategories: updatedAddonCategories
                          })
                        }}
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-xs"
                      >
                        + Add Addon Category
                      </Button>
                    </div>
                    
                    {/* Addon Categories List */}
                    {serving.addonCategories && serving.addonCategories.length > 0 ? (
                      <div className="space-y-2">
                        {serving.addonCategories.map((addonCategory, categoryIndex) => (
                          <div key={addonCategory.categoryId} className="bg-gray-50 rounded-md p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex-1 mr-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Addon Category</label>
                                <Dropdown
                                  options={[
                                    { value: 'toppings', label: 'Toppings' },
                                    { value: 'sides', label: 'Sides' },
                                    { value: 'condiments', label: 'Condiments' },
                                    { value: 'beverages', label: 'Beverages' },
                                    { value: 'desserts', label: 'Desserts' }
                                  ]}
                                  value={addonCategory.name}
                                  onChange={(value) => {
                                    const updatedCategories = [...serving.addonCategories]
                                    updatedCategories[categoryIndex] = {
                                      ...addonCategory,
                                      name: Array.isArray(value) ? value[0] : value
                                    }
                                    onUpdateServing(serving.id, {
                                      addonCategories: updatedCategories
                                    })
                                  }}
                                  placeholder="Select category"
                                  className="w-full relative z-20"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedCategories = serving.addonCategories.filter(
                                    (_, index) => index !== categoryIndex
                                  )
                                  onUpdateServing(serving.id, {
                                    addonCategories: updatedCategories
                                  })
                                }}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                              >
                                🗑️
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
                                      const updatedCategories = [...serving.addonCategories]
                                      updatedCategories[categoryIndex] = {
                                        ...addonCategory,
                                        required: e.target.checked
                                      }
                                      onUpdateServing(serving.id, {
                                        addonCategories: updatedCategories
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
                                      const updatedCategories = [...serving.addonCategories]
                                      updatedCategories[categoryIndex] = {
                                        ...addonCategory,
                                        minSelection: parseInt(e.target.value) || 0
                                      }
                                      onUpdateServing(serving.id, {
                                        addonCategories: updatedCategories
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
                                      const updatedCategories = [...serving.addonCategories]
                                      updatedCategories[categoryIndex] = {
                                        ...addonCategory,
                                        maxSelection: parseInt(e.target.value) || 1
                                      }
                                      onUpdateServing(serving.id, {
                                        addonCategories: updatedCategories
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
                      <div className="text-center py-3 text-gray-400 text-xs">
                        <p>No addon categories configured</p>
                        <p>Click "Add Addon Category" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
