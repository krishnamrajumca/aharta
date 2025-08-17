'use client'

import React, { useState } from 'react'
import { 
  Menu, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Grid3X3,
  List,
  Clock,
  DollarSign,
  Tag,
  GripVertical,
  X,
  Users,
  Package,
  Minus,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for menu items
const menuCategories = [
  { id: 1, name: 'Appetizers', count: 12, color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Main Courses', count: 24, color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Desserts', count: 8, color: 'bg-purple-100 text-purple-800' },
  { id: 4, name: 'Beverages', count: 15, color: 'bg-orange-100 text-orange-800' },
  { id: 5, name: 'Sides', count: 18, color: 'bg-red-100 text-red-800' },
  { id: 6, name: 'Specials', count: 6, color: 'bg-yellow-100 text-yellow-800' }
]

// Mock data for addon categories
const addonCategories = [
  { id: 1, name: 'Toppings', description: 'Pizza and burger toppings' },
  { id: 2, name: 'Sides', description: 'Side dishes and accompaniments' },
  { id: 3, name: 'Condiments', description: 'Sauces and dressings' },
  { id: 4, name: 'Beverages', description: 'Drinks and refreshments' },
  { id: 5, name: 'Desserts', description: 'Sweet treats and desserts' },
  { id: 6, name: 'Extras', description: 'Additional items and upgrades' }
]

// Mock data for addons (available for complex items)
const availableAddons = [
  { id: 1, name: 'Extra Cheese', price: 2.99, category: 'Toppings', categoryId: 1 },
  { id: 2, name: 'Bacon Bits', price: 3.99, category: 'Toppings', categoryId: 1 },
  { id: 3, name: 'Avocado', price: 4.99, category: 'Toppings', categoryId: 1 },
  { id: 4, name: 'Side Salad', price: 5.99, category: 'Sides', categoryId: 2 },
  { id: 5, name: 'French Fries', price: 4.49, category: 'Sides', categoryId: 2 },
  { id: 6, name: 'Extra Sauce', price: 1.99, category: 'Condiments', categoryId: 3 },
  { id: 7, name: 'Soft Drink', price: 2.99, category: 'Beverages', categoryId: 4 },
  { id: 8, name: 'Ice Cream', price: 3.99, category: 'Desserts', categoryId: 5 }
]

const categoryOptions: DropdownOption[] = [
  { value: 'all', label: 'All Categories' },
  ...menuCategories.map(category => ({ value: category.name, label: category.name }))
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

const itemTypeOptions: DropdownOption[] = [
  { value: 'simple', label: 'Simple Item' },
  { value: 'complex', label: 'Complex Item (with servings & addons)' }
]

const servingSizeOptions: DropdownOption[] = [
  { value: 'small', label: 'Small (1-2 people)' },
  { value: 'medium', label: 'Medium (3-4 people)' },
  { value: 'large', label: 'Large (5-6 people)' },
  { value: 'family', label: 'Family (6+ people)' }
]

// Enhanced complex item structure
const menuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
    category: 'Main Courses',
    type: 'simple',
    price: 28.99,
    cost: 12.50,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '25 min',
    allergens: ['Fish', 'Dairy'],
    tags: ['Popular', 'Chef Special'],
    stock: 45,
    position: 1
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons with caesar dressing',
    category: 'Appetizers',
    type: 'simple',
    price: 14.99,
    cost: 6.20,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '10 min',
    allergens: ['Dairy', 'Gluten'],
    tags: ['Vegetarian', 'Healthy'],
    stock: 32,
    position: 2
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    category: 'Desserts',
    type: 'simple',
    price: 12.99,
    cost: 4.80,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '15 min',
    allergens: ['Eggs', 'Dairy', 'Gluten'],
    tags: ['Sweet', 'Popular'],
    stock: 28,
    position: 3
  },
  {
    id: 4,
    name: 'Iced Latte',
    description: 'Espresso with cold milk and ice, customizable with syrups',
    category: 'Beverages',
    type: 'simple',
    price: 5.99,
    cost: 2.10,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '5 min',
    allergens: ['Dairy'],
    tags: ['Caffeinated', 'Cold'],
    stock: 67,
    position: 4
  },
  {
    id: 5,
    name: 'Family Pizza Combo',
    description: 'Large pizza with choice of toppings, served with sides and drinks',
    category: 'Main Courses',
    type: 'complex',
    price: 45.99,
    cost: 18.50,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '30 min',
    allergens: ['Dairy', 'Gluten'],
    tags: ['Family', 'Popular'],
    stock: 15,
    position: 5,
    servings: [
      {
        id: 1,
        name: 'Main Pizza',
        description: 'Large 16" pizza with choice of toppings',
        size: 'family',
        people: '6+ people',
        includes: ['Large Pizza Base', 'Choice of 3 Toppings', 'Herbs & Spices'],
        addonCategories: [
          {
            categoryId: 1,
            name: 'Toppings',
            required: true,
            minSelection: 0,
            maxSelection: 5,
            addons: [1, 2, 3] // Extra Cheese, Bacon Bits, Avocado
          }
        ]
      },
      {
        id: 2,
        name: 'Side Dishes',
        description: 'Choose from our selection of sides',
        size: 'medium',
        people: '4-6 people',
        includes: ['2 Side Dishes', 'Dipping Sauces'],
        addonCategories: [
          {
            categoryId: 2,
            name: 'Sides',
            required: false,
            minSelection: 0,
            maxSelection: 3,
            addons: [4, 5] // Side Salad, French Fries
          }
        ]
      },
      {
        id: 3,
        name: 'Beverages',
        description: 'Refreshing drinks to complement your meal',
        size: 'medium',
        people: '4-6 people',
        includes: ['2 Drinks', 'Ice & Garnish'],
        addonCategories: [
          {
            categoryId: 4,
            name: 'Beverages',
            required: false,
            minSelection: 0,
            maxSelection: 2,
            addons: [7] // Soft Drink
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Party Platter',
    description: 'Assorted appetizers and finger foods perfect for gatherings',
    category: 'Appetizers',
    type: 'complex',
    price: 38.99,
    cost: 15.20,
    image: '/api/placeholder/300/200',
    status: 'active',
    preparationTime: '20 min',
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    tags: ['Party', 'Sharing'],
    stock: 8,
    position: 6,
    servings: [
      {
        id: 1,
        name: 'Appetizer Selection',
        description: 'Choose from our premium appetizer selection',
        size: 'large',
        people: '5-6 people',
        includes: ['8 Appetizers', '2 Dips', 'Garnish'],
        addonCategories: [
          {
            categoryId: 1,
            name: 'Toppings',
            required: false,
            minSelection: 0,
            maxSelection: 4,
            addons: [3] // Avocado
          }
        ]
      },
      {
        id: 2,
        name: 'Condiments & Sauces',
        description: 'Enhance your appetizers with our signature sauces',
        size: 'medium',
        people: '5-6 people',
        includes: ['3 Sauces', 'Seasoning'],
        addonCategories: [
          {
            categoryId: 3,
            name: 'Condiments',
            required: false,
            minSelection: 0,
            maxSelection: 2,
            addons: [6] // Extra Sauce
          }
        ]
      }
    ]
  }
]

export default function MenuItemsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [selectedItemType, setSelectedItemType] = useState<'simple' | 'complex'>('simple')
  const [selectedServingSize, setSelectedServingSize] = useState<string>('medium')
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])
  
  // New state for complex items
  const [servings, setServings] = useState<any[]>([])
  const [editingServing, setEditingServing] = useState<any>(null)
  const [showServingModal, setShowServingModal] = useState(false)

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getProfitMargin = (price: number, cost: number) => {
    return Math.round(((price - cost) / price) * 100)
  }

  const handleDragStart = (e: React.DragEvent, item: any) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetItem: any) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetItem.id) return

    // Update positions logic here
    console.log(`Moved ${draggedItem.name} to position ${targetItem.position}`)
    setDraggedItem(null)
  }

  const handleAddItem = () => {
    console.log('Adding new menu item')
    setSelectedItemType('simple')
    setSelectedServingSize('medium')
    setSelectedAddons([])
    setShowAddModal(true)
  }

  const handleEditItem = (item: any) => {
    console.log('Editing item:', item)
    setEditingItem(item)
    setSelectedItemType(item.type || 'simple')
    setSelectedServingSize(item.servings?.[0]?.size || 'medium')
    setSelectedAddons(item.addons?.map((a: any) => a.id) || [])
    setServings(item.servings || [])
    setShowAddModal(true)
  }

  const handleDeleteItem = (itemId: number) => {
    console.log('Deleting item:', itemId)
  }

  const handleAddonToggle = (addonId: number) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const resetModalState = () => {
    setShowAddModal(false)
    setEditingItem(null)
    setSelectedItemType('simple')
    setSelectedServingSize('medium')
    setSelectedAddons([])
    setServings([])
    setEditingServing(null)
  }

  const openAddModal = () => {
    setShowAddModal(true)
    setEditingItem(null)
  }

  const openEditModal = (item: any) => {
    setEditingItem(item)
    setSelectedItemType(item.type)
    setSelectedServingSize(item.servings?.[0]?.size || 'medium')
    setSelectedAddons(item.addons?.map((a: any) => a.id) || [])
    setServings(item.servings || [])
    setShowAddModal(true)
  }

  // New functions for managing servings
  const addServing = () => {
    const newServing = {
      id: Date.now(),
      name: '',
      description: '',
      size: 'medium',
      people: '',
      includes: [''],
      addonCategories: []
    }
    setServings([...servings, newServing])
  }

  const removeServing = (servingId: number) => {
    setServings(servings.filter(s => s.id !== servingId))
  }

  const updateServing = (servingId: number, updates: any) => {
    setServings(servings.map(s => 
      s.id === servingId ? { ...s, ...updates } : s
    ))
  }

  const addAddonCategoryToServing = (servingId: number) => {
    const serving = servings.find(s => s.id === servingId)
    if (serving) {
      const newAddonCategory = {
        categoryId: 1,
        name: 'Toppings',
        required: false,
        minSelection: 0,
        maxSelection: 3,
        addons: []
      }
      updateServing(servingId, {
        addonCategories: [...serving.addonCategories, newAddonCategory]
      })
    }
  }

  const removeAddonCategoryFromServing = (servingId: number, categoryIndex: number) => {
    const serving = servings.find(s => s.id === servingId)
    if (serving) {
      const updatedCategories = serving.addonCategories.filter((_: any, index: number) => index !== categoryIndex)
      updateServing(servingId, { addonCategories: updatedCategories })
    }
  }

  const updateAddonCategory = (servingId: number, categoryIndex: number, updates: any) => {
    const serving = servings.find(s => s.id === servingId)
    if (serving) {
      const updatedCategories = [...serving.addonCategories]
      updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], ...updates }
      updateServing(servingId, { addonCategories: updatedCategories })
    }
  }

  const getAddonsByCategory = (categoryId: number) => {
    return availableAddons.filter(addon => addon.categoryId === categoryId)
  }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectedCategory(Array.isArray(value) ? value[0] : value)
  }

  const handleViewModeChange = (value: string | string[]) => {
    setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : value as 'grid' | 'list')
  }

  const handleItemTypeChange = (value: string | string[]) => {
    const newType = Array.isArray(value) ? value[0] : value
    setSelectedItemType(newType as 'simple' | 'complex')
    
    // Reset complex-specific fields when switching to simple
    if (newType === 'simple') {
      setSelectedServingSize('medium')
      setSelectedAddons([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
          <p className="text-gray-600">Manage your menu items and pricing</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(Array.isArray(value) ? value[0] : value)}
            placeholder="Category"
            searchable
          />
          <Dropdown
            options={viewModeOptions}
            value={viewMode}
            onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
            placeholder="View"
          />
        </div>
      </div>

      {/* Items Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
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
                      {item.servings.map((serving: any, index: number) => (
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
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Menu className="h-8 w-8 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.type === 'complex' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.type === 'complex' ? 'Complex' : 'Simple'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">${item.price}</div>
                        <div className="text-sm text-gray-500">Stock: {item.stock}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.preparationTime}
                      </span>
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {getProfitMargin(item.price, item.cost)}% margin
                      </span>
                    </div>

                    {/* Complex Item Servings Info */}
                    {item.type === 'complex' && item.servings && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-md">
                        <div className="flex items-center text-sm text-purple-700 mb-2">
                          <Users className="h-4 w-4 mr-1" />
                          <strong>{item.servings.length} Serving{item.servings.length !== 1 ? 's' : ''}</strong>
                        </div>
                        <div className="space-y-2">
                          {item.servings.map((serving: any) => (
                            <div key={serving.id} className="text-xs text-purple-600 border-l-2 border-purple-200 pl-2">
                              <div className="font-medium">{serving.name}</div>
                              <div>{serving.people} • {serving.includes.join(', ')}</div>
                              {serving.addonCategories?.length > 0 && (
                                <div className="text-purple-500 mt-1">
                                  {serving.addonCategories.length} addon option{serving.addonCategories.length !== 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetModalState}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
              {/* Item Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedItemType === 'simple' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedItemType('simple')}
                  >
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Simple Item</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Basic menu item with standard pricing</p>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedItemType === 'complex' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedItemType('complex')}
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Complex Item</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Item with multiple servings and customizable addons</p>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <Input defaultValue={editingItem?.name || ''} placeholder="Enter item name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Dropdown
                    options={menuCategories.map(cat => ({ value: cat.name, label: cat.name }))}
                    value={editingItem?.category || ''}
                    onChange={(value) => console.log('Category changed:', value)}
                    placeholder="Select category"
                    searchable
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter item description"
                  defaultValue={editingItem?.description || ''}
                />
              </div>

              {/* Complex Item Specific Fields */}
              {selectedItemType === 'complex' && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Servings Configuration
                    </h4>
                    <Button
                      onClick={addServing}
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
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
                      {servings.map((serving, servingIndex) => (
                        <Card key={serving.id} className="border-purple-200 bg-purple-50/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-purple-900">Serving {servingIndex + 1}</h5>
                              <Button
                                onClick={() => removeServing(serving.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serving Name</label>
                                <Input
                                  value={serving.name}
                                  onChange={(e) => updateServing(serving.id, { name: e.target.value })}
                                  placeholder="e.g., Main Course, Side Dish"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
                                <Dropdown
                                  options={servingSizeOptions}
                                  value={serving.size}
                                  onChange={(value) => updateServing(serving.id, { size: Array.isArray(value) ? value[0] : value })}
                                  placeholder="Select size"
                                />
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Input
                                value={serving.description}
                                onChange={(e) => updateServing(serving.id, { description: e.target.value })}
                                placeholder="Describe what this serving includes"
                              />
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">What's Included</label>
                              <div className="space-y-2">
                                {serving.includes.map((include: any, includeIndex: number) => (
                                  <div key={includeIndex} className="flex items-center space-x-2">
                                    <Input
                                      value={include}
                                      onChange={(e) => {
                                        const newIncludes = [...serving.includes]
                                        newIncludes[includeIndex] = e.target.value
                                        updateServing(serving.id, { includes: newIncludes })
                                      }}
                                      placeholder="e.g., Main dish, 2 sides"
                                    />
                                    <Button
                                      onClick={() => {
                                        const newIncludes = serving.includes.filter((_: any, i: number) => i !== includeIndex)
                                        updateServing(serving.id, { includes: newIncludes })
                                      }}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  onClick={() => {
                                    const newIncludes = [...serving.includes, '']
                                    updateServing(serving.id, { includes: newIncludes })
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Include
                                </Button>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">People Served</label>
                              <Input
                                value={serving.people}
                                onChange={(e) => updateServing(serving.id, { people: e.target.value })}
                                placeholder="e.g., 2-3 people, 4-6 people"
                              />
                            </div>

                            {/* Addon Categories for this Serving */}
                            <div className="border-t border-purple-200 pt-4">
                              <div className="flex items-center justify-between mb-3">
                                <h6 className="font-medium text-purple-800">Addon Categories</h6>
                                <Button
                                  onClick={() => addAddonCategoryToServing(serving.id)}
                                  variant="outline"
                                  size="sm"
                                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Category
                                </Button>
                              </div>
                              
                              {serving.addonCategories?.length === 0 ? (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                  No addon categories configured for this serving
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {serving.addonCategories?.map((addonCategory: any, categoryIndex: number) => (
                                    <Card key={categoryIndex} className="border-gray-200">
                                      <CardContent className="p-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <h6 className="font-medium text-gray-800">Addon Category {categoryIndex + 1}</h6>
                                          <Button
                                            onClick={() => removeAddonCategoryFromServing(serving.id, categoryIndex)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                          <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                            <Dropdown
                                              options={addonCategories.map((cat: any) => ({ value: cat.id, label: cat.name }))}
                                              value={addonCategory.categoryId}
                                              onChange={(value) => updateAddonCategory(serving.id, categoryIndex, { 
                                                categoryId: Array.isArray(value) ? value[0] : value,
                                                name: addonCategories.find((cat: any) => cat.id === (Array.isArray(value) ? value[0] : value))?.name || ''
                                              })}
                                              placeholder="Select category"
                                              searchable
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Required</label>
                                            <Dropdown
                                              options={[
                                                { value: 'true', label: 'Yes' },
                                                { value: 'false', label: 'No' }
                                              ]}
                                              value={addonCategory.required}
                                              onChange={(value) => updateAddonCategory(serving.id, categoryIndex, { 
                                                required: Array.isArray(value) ? value[0] : value 
                                              })}
                                              placeholder="Required?"
                                            />
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                          <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Min Selection</label>
                                            <Input
                                              type="number"
                                              min="0"
                                              value={addonCategory.minSelection}
                                              onChange={(e) => updateAddonCategory(serving.id, categoryIndex, { 
                                                minSelection: parseInt(e.target.value) || 0 
                                              })}
                                              placeholder="0"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Max Selection</label>
                                            <Input
                                              type="number"
                                              min="1"
                                              value={addonCategory.maxSelection}
                                              onChange={(e) => updateAddonCategory(serving.id, categoryIndex, { 
                                                maxSelection: parseInt(e.target.value) || 1 
                                              })}
                                              placeholder="3"
                                            />
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <label className="block text-xs font-medium text-gray-700 mb-1">Available Addons</label>
                                          <div className="space-y-2">
                                            {getAddonsByCategory(addonCategory.categoryId).map((addon) => (
                                              <div key={addon.id} className="flex items-center space-x-2">
                                                <input
                                                  type="checkbox"
                                                  id={`addon-${serving.id}-${categoryIndex}-${addon.id}`}
                                                  checked={addonCategory.addons.includes(addon.id)}
                                                  onChange={() => {
                                                    const newAddons = addonCategory.addons.includes(addon.id)
                                                      ? addonCategory.addons.filter((id: any) => id !== addon.id)
                                                      : [...addonCategory.addons, addon.id]
                                                    updateAddonCategory(serving.id, categoryIndex, { addons: newAddons })
                                                  }}
                                                  className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor={`addon-${serving.id}-${categoryIndex}-${addon.id}`} className="text-xs text-gray-700 cursor-pointer">
                                                  {addon.name} (${addon.price})
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Standard Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <Input type="number" step="0.01" defaultValue={editingItem?.price || ''} placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <Input type="number" step="0.01" defaultValue={editingItem?.cost || ''} placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>
                  <Input defaultValue={editingItem?.preparationTime || ''} placeholder="e.g., 15 min" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <Input type="number" defaultValue={editingItem?.stock || ''} placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <Input type="number" defaultValue={editingItem?.position || ''} placeholder="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value={editingItem?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={resetModalState}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
