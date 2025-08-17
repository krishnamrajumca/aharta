'use client'

import React, { useState } from 'react'

// Import components
import ItemsHeader from '../../components/ItemsHeader'
import ItemsFilters from '../../components/ItemsFilters'
import ItemsGrid from '../../components/ItemsGrid'
import ItemModal from '../../components/ItemModal'
import DeleteConfirmModal from '../../components/DeleteConfirmModal'

// Mock data for menu items
const menuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
    category: 'Main Courses',
    type: 'simple' as const,
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
    type: 'simple' as const,
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
    type: 'simple' as const,
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
    type: 'simple' as const,
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
    type: 'complex' as const,
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
            addons: [1, 2, 3]
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
            addons: [4, 5]
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
            addons: [7]
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
    type: 'complex' as const,
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
            addons: [3]
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
            addons: [6]
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
  const [servings, setServings] = useState<any[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddItem = () => {
    console.log('Adding new item')
    setShowAddModal(true)
    setEditingItem(null)
    setSelectedItemType('simple')
    setServings([])
  }

  const handleEditItem = (item: any) => {
    console.log('Editing item:', item)
    setEditingItem(item)
    setSelectedItemType(item.type)
    setServings(item.servings || [])
    setShowAddModal(true)
  }

  const handleDeleteItem = (itemId: number) => {
    console.log('Deleting item:', itemId)
    const itemToDelete = menuItems.find(item => item.id === itemId)
    if (itemToDelete) {
      setItemToDelete(itemToDelete)
      setShowDeleteConfirm(true)
    }
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
    if (draggedItem && draggedItem.id !== targetItem.id) {
      console.log('Reordering:', draggedItem.name, 'to position of', targetItem.name)
      // Here you would implement the actual reordering logic
    }
    setDraggedItem(null)
  }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectedCategory(Array.isArray(value) ? value[0] : value)
  }

  const handleViewModeChange = (value: string | string[]) => {
    setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : value as 'grid' | 'list')
  }

  const handleItemTypeChange = (type: 'simple' | 'complex') => {
    setSelectedItemType(type)
    
    // Reset complex-specific fields when switching to simple
    if (type === 'simple') {
      setServings([])
    }
  }

  const handleAddServing = () => {
    const newServing = {
      id: Date.now(),
      name: `Serving ${servings.length + 1}`,
      description: '',
      size: 'medium',
      people: '',
      includes: [],
      addonCategories: []
    }
    setServings([...servings, newServing])
  }

  const handleEditServing = (serving: any) => {
    console.log('Editing serving:', serving)
    // Here you would implement serving editing logic
  }

  const handleDeleteServing = (servingId: number) => {
    setServings(servings.filter(s => s.id !== servingId))
  }

  const handleUpdateServing = (servingId: number, updates: any) => {
    setServings(servings.map(s => s.id === servingId ? { ...s, ...updates } : s))
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingItem(null)
    setSelectedItemType('simple')
    setServings([])
  }

  const handleModalSubmit = () => {
    console.log('Submitting item form')
    // Here you would implement the actual form submission logic
    handleModalClose()
  }

  const handleConfirmDelete = () => {
    console.log('Confirmed deletion of item:', itemToDelete?.id)
    // Here you would implement the actual deletion logic from the menuItems array
    setShowDeleteConfirm(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    console.log('Cancelled deletion of item:', itemToDelete?.id)
    setShowDeleteConfirm(false)
    setItemToDelete(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ItemsHeader onAddItem={handleAddItem} />

      {/* Filters */}
      <ItemsFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        viewMode={viewMode}
        onSearchChange={setSearchQuery}
        onCategoryChange={handleCategoryChange}
        onViewModeChange={handleViewModeChange}
      />

      {/* Items Grid/List */}
      {viewMode === 'grid' && (
        <ItemsGrid
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      )}

      {/* Add/Edit Item Modal */}
      <ItemModal
        isOpen={showAddModal}
        editingItem={editingItem}
        selectedItemType={selectedItemType}
        servings={servings}
        onClose={handleModalClose}
        onItemTypeChange={handleItemTypeChange}
        onAddServing={handleAddServing}
        onEditServing={handleEditServing}
        onDeleteServing={handleDeleteServing}
        onUpdateServing={handleUpdateServing}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        type="menu-item"
        itemName={itemToDelete?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
