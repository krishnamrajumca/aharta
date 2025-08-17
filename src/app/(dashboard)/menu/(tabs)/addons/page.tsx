'use client'

import React, { useState } from 'react'

// Import components
import AddonsHeader from './components/AddonsHeader'
import AddonsGrid from './components/AddonsGrid'
import AddonModal from './components/AddonModal'
import CategoryModal from './components/CategoryModal'
import DeleteConfirmModal from '../../components/DeleteConfirmModal'

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

// Enhanced category data structure
const addonCategories = [
  {
    id: 1,
    name: 'Toppings',
    description: 'Additional ingredients to enhance your dish',
    status: 'active',
    addonCount: 3
  },
  {
    id: 2,
    name: 'Sides',
    description: 'Accompanying dishes and side orders',
    status: 'active',
    addonCount: 3
  },
  {
    id: 3,
    name: 'Condiments',
    description: 'Sauces, dressings, and flavor enhancers',
    status: 'active',
    addonCount: 2
  }
]

export default function AddonsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddonModal, setShowAddonModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingAddon, setEditingAddon] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [draggedAddon, setDraggedAddon] = useState<any>(null)
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    type: 'addon' | 'addon-category' | null
    item: any
    isOpen: boolean
  }>({
    type: null,
    item: null,
    isOpen: false
  })
  const [isDeleting, setIsDeleting] = useState(false)

  // Filtered addons based on selected category
  const filteredAddons = selectedCategory === 'all' 
    ? addons 
    : addons.filter(addon => addon.category === selectedCategory)

  // Event handlers
  const handleAddAddon = () => {
    setShowAddonModal(true)
    setEditingAddon(null)
  }

  const handleAddCategory = () => {
    setShowCategoryModal(true)
    setEditingCategory(null)
  }

  const handleEditAddon = (addon: any) => {
    setEditingAddon(addon)
    setShowAddonModal(true)
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setShowCategoryModal(true)
  }

  const handleDeleteAddon = (addon: any) => {
    setShowDeleteConfirm({
      type: 'addon',
      item: addon,
      isOpen: true
    })
  }

  const handleDeleteCategory = (category: any) => {
    setShowDeleteConfirm({
      type: 'addon-category',
      item: category,
      isOpen: true
    })
  }

  const handleModalClose = () => {
    setShowAddonModal(false)
    setShowCategoryModal(false)
    setEditingAddon(null)
    setEditingCategory(null)
  }

  const handleAddonModalSubmit = () => {
    console.log('Submitting addon form')
    setShowAddonModal(false)
    setEditingAddon(null)
  }

  const handleCategoryModalSubmit = () => {
    console.log('Submitting category form')
    setShowCategoryModal(false)
    setEditingCategory(null)
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, addon: any) => {
    setDraggedAddon(addon)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetAddon: any) => {
    e.preventDefault()
    if (draggedAddon && draggedAddon.id !== targetAddon.id) {
      console.log('Reordering addons:', draggedAddon.name, 'to position of', targetAddon.name)
      setDraggedAddon(null)
    }
  }

  // Delete confirmation handlers
  const handleConfirmDelete = async () => {
    if (!showDeleteConfirm.item || !showDeleteConfirm.type) return
    
    setIsDeleting(true)
    try {
      if (showDeleteConfirm.type === 'addon') {
        console.log('Deleting addon:', showDeleteConfirm.item.name)
        // Here you would implement the actual delete API call for addons
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      } else if (showDeleteConfirm.type === 'addon-category') {
        console.log('Deleting addon category:', showDeleteConfirm.item.name)
        // Here you would implement the actual delete API call for categories
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      }
      
      console.log('Item deleted successfully')
      
      // Close modal and reset state
      setShowDeleteConfirm({ type: null, item: null, isOpen: false })
      setIsDeleting(false)
    } catch (error) {
      console.error('Error deleting item:', error)
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm({ type: null, item: null, isOpen: false })
    setIsDeleting(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AddonsHeader 
        onAddAddon={handleAddAddon}
        onAddCategory={handleAddCategory}
      />

      {/* Category Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 h-6 w-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="p-1 h-6 w-6 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filteredAddons.length} addons found</p>
      </div>

      {/* Addons Grid */}
      <AddonsGrid
        addons={filteredAddons}
        onEdit={handleEditAddon}
        onDelete={handleDeleteAddon}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

      {/* Add/Edit Addon Modal */}
      <AddonModal
        isOpen={showAddonModal}
        editingAddon={editingAddon}
        onClose={handleModalClose}
        onSubmit={handleAddonModalSubmit}
        categories={addonCategories}
      />

      {/* Add/Edit Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        editingCategory={editingCategory}
        onClose={handleModalClose}
        onSubmit={handleCategoryModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm.isOpen}
        type={showDeleteConfirm.type || 'addon'}
        itemName={showDeleteConfirm.item?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
