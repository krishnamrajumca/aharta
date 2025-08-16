'use client'

import React, { useState } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Tag,
  GripVertical,
  X,
  FolderPlus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for addons
const addons = [
  {
    id: 1,
    name: 'Extra Cheese',
    price: 2.99,
    category: 'Toppings',
    status: 'active',
    position: 1,
    description: 'Additional cheese for your dish'
  },
  {
    id: 2,
    name: 'Bacon Bits',
    price: 3.99,
    category: 'Toppings',
    status: 'active',
    position: 2,
    description: 'Crispy bacon bits to enhance flavor'
  },
  {
    id: 3,
    name: 'Avocado',
    price: 4.99,
    category: 'Toppings',
    status: 'active',
    position: 3,
    description: 'Fresh avocado slices'
  },
  {
    id: 4,
    name: 'Side Salad',
    price: 5.99,
    category: 'Sides',
    status: 'active',
    position: 4,
    description: 'Fresh garden salad with house dressing'
  },
  {
    id: 5,
    name: 'French Fries',
    price: 4.49,
    category: 'Sides',
    status: 'active',
    position: 5,
    description: 'Crispy golden fries with sea salt'
  },
  {
    id: 6,
    name: 'Onion Rings',
    price: 5.49,
    category: 'Sides',
    status: 'active',
    position: 6,
    description: 'Beer-battered onion rings'
  },
  {
    id: 7,
    name: 'Extra Sauce',
    price: 1.99,
    category: 'Condiments',
    status: 'active',
    position: 7,
    description: 'Additional sauce of your choice'
  },
  {
    id: 8,
    name: 'Dipping Sauce',
    price: 2.49,
    category: 'Condiments',
    status: 'active',
    position: 8,
    description: 'House-made dipping sauce'
  }
]

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

export default function AddonsPage() {
  // Enhanced category data structure
  const [addonCategories, setAddonCategories] = useState([
    { id: 1, name: 'Toppings', description: 'Additional toppings for dishes', status: 'active' },
    { id: 2, name: 'Sides', description: 'Side dishes and accompaniments', status: 'active' },
    { id: 3, name: 'Condiments', description: 'Sauces and condiments', status: 'active' },
    { id: 4, name: 'Beverages', description: 'Drinks and refreshments', status: 'active' },
    { id: 5, name: 'Desserts', description: 'Sweet treats and desserts', status: 'active' }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingAddon, setEditingAddon] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Categories' },
    ...addonCategories.map(category => ({ value: category.name, label: category.name }))
  ]

  const addonCategoryOptions: DropdownOption[] = addonCategories
    .filter(category => category.status === 'active')
    .map(category => ({ 
      value: category.name, 
      label: category.name 
    }))

  const filteredAddons = addons.filter(addon => {
    return selectedCategory === 'all' || addon.category === selectedCategory
  })

  const handleAddAddon = () => {
    console.log('Adding new addon')
    setShowAddModal(true)
  }

  const handleEditAddon = (addon: any) => {
    console.log('Editing addon:', addon)
    setEditingAddon(addon)
    setShowAddModal(true)
  }

  const handleDeleteAddon = (addonId: number) => {
    console.log('Deleting addon:', addonId)
  }

  const handleAddCategory = () => {
    console.log('Adding new category')
    setEditingCategory(null)
    setShowCategoryModal(true)
  }

  const handleEditCategory = (category: any) => {
    console.log('Editing category:', category)
    setEditingCategory(category)
    setShowCategoryModal(true)
  }

  const handleDeleteCategory = (categoryId: number) => {
    console.log('Deleting category:', categoryId)
  }

  const handleDragStart = (e: React.DragEvent, addon: any) => {
    setDraggedItem(addon)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetAddon: any) => {
    e.preventDefault()
    if (draggedItem && draggedItem.id !== targetAddon.id) {
      console.log('Reordering:', draggedItem.name, 'to position of', targetAddon.name)
      // Here you would implement the actual reordering logic
    }
    setDraggedItem(null)
  }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectedCategory(Array.isArray(value) ? value[0] : value)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Addons & Extras</h2>
          <p className="text-gray-600 mt-1">Manage additional items, toppings, and extras</p>
        </div>
      </div>

      {/* Add Category Button */}
      <div className="flex justify-end">
        <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700">
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Category Filter */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories ({addons.length})
            </button>
            {addonCategories.map(category => {
              const count = addons.filter(addon => addon.category === category.name).length
              return (
                <div key={category.id} className="relative group">
                  <button
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({count})
                  </button>
                  <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        className="p-1 h-6 w-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1 h-6 w-6 text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Addon Button - Moved below category card */}
      <div className="flex justify-end">
        <Button onClick={handleAddAddon} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Addon
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filteredAddons.length} addons found</p>
      </div>

      {/* Addons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAddons.map((addon) => (
          <Card 
            key={addon.id} 
            className="hover:shadow-xl transition-all duration-300 cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, addon)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, addon)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Tag className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditAddon(addon)}
                    className="p-1 h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAddon(addon.id)}
                    className="p-1 h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">${addon.price}</span>
                  <span className="text-xs text-gray-400">Pos: {addon.position}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {addon.category}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    addon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {addon.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCategoryModal(false)
                    setEditingCategory(null)
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
                  <Input 
                    defaultValue={editingCategory?.name || ''} 
                    placeholder="Enter category name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    placeholder="Enter category description"
                    defaultValue={editingCategory?.description || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={statusOptions}
                    value={editingCategory?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCategoryModal(false)
                      setEditingCategory(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add/Edit Addon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingAddon ? 'Edit Addon' : 'Add New Addon'}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingAddon(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {editingAddon ? 'Update the addon details below' : 'Fill in the details to create a new addon'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Addon Name</label>
                  <Input defaultValue={editingAddon?.name || ''} placeholder="Enter addon name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    placeholder="Enter addon description"
                    defaultValue={editingAddon?.description || ''}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Dropdown
                      options={addonCategoryOptions}
                      value={editingAddon?.category || ''}
                      onChange={(value) => console.log('Category changed:', value)}
                      placeholder="Select category"
                      searchable
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <Input type="number" defaultValue={editingAddon?.position || ''} placeholder="1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingAddon?.price || ''} 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={statusOptions}
                    value={editingAddon?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingAddon(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    {editingAddon ? 'Update Addon' : 'Add Addon'}
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
