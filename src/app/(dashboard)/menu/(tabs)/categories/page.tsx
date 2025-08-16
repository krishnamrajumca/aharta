'use client'

import React, { useState } from 'react'
import { 
  Menu, 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for menu categories
const menuCategories = [
  { id: 1, name: 'Appetizers', count: 12, color: 'bg-blue-100 text-blue-800', position: 1 },
  { id: 2, name: 'Main Courses', count: 24, color: 'bg-green-100 text-green-800', position: 2 },
  { id: 3, name: 'Desserts', count: 8, color: 'bg-purple-100 text-purple-800', position: 3 },
  { id: 4, name: 'Beverages', count: 15, color: 'bg-orange-100 text-orange-800', position: 4 },
  { id: 5, name: 'Sides', count: 18, color: 'bg-red-100 text-red-800', position: 5 },
  { id: 6, name: 'Specials', count: 6, color: 'bg-yellow-100 text-yellow-800', position: 6 }
]

const colorThemeOptions: DropdownOption[] = [
  { value: 'bg-blue-100 text-blue-800', label: 'Blue Theme' },
  { value: 'bg-green-100 text-green-800', label: 'Green Theme' },
  { value: 'bg-purple-100 text-purple-800', label: 'Purple Theme' },
  { value: 'bg-orange-100 text-orange-800', label: 'Orange Theme' },
  { value: 'bg-red-100 text-red-800', label: 'Red Theme' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow Theme' }
]

export default function CategoriesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [selectedColorTheme, setSelectedColorTheme] = useState<string>('')

  const handleAddCategory = () => {
    console.log('Adding new category')
    setShowAddModal(true)
  }

  const handleEditCategory = (category: any) => {
    console.log('Editing category:', category)
    setEditingCategory(category)
    setSelectedColorTheme(category.color)
    setShowAddModal(true)
  }

  const handleDeleteCategory = (categoryId: number) => {
    console.log('Deleting category:', categoryId)
  }

  const handleDragStart = (e: React.DragEvent, category: any) => {
    setDraggedItem(category)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetCategory: any) => {
    e.preventDefault()
    if (draggedItem && draggedItem.id !== targetCategory.id) {
      console.log('Reordering:', draggedItem.name, 'to position of', targetCategory.name)
      // Here you would implement the actual reordering logic
    }
    setDraggedItem(null)
  }

  const handleColorThemeChange = (value: string | string[]) => {
    setSelectedColorTheme(Array.isArray(value) ? value[0] : value)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Menu Categories</h2>
          <p className="text-gray-600 mt-1">Organize your menu into logical categories</p>
        </div>
        <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuCategories.map((category) => (
          <Card 
            key={category.id} 
            className="hover:shadow-xl transition-all duration-300 cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, category)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
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
                    onClick={() => handleEditCategory(category)}
                    className="p-1 h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
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
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingCategory(null)
                    setSelectedColorTheme('')
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {editingCategory ? 'Update the category details below' : 'Fill in the details to create a new category'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <Input defaultValue={editingCategory?.name || ''} placeholder="Enter category name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <Dropdown
                    options={colorThemeOptions}
                    value={selectedColorTheme}
                    onChange={handleColorThemeChange}
                    placeholder="Select a color theme"
                    searchable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <Input type="number" defaultValue={editingCategory?.position || ''} placeholder="1" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingCategory(null)
                      setSelectedColorTheme('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
