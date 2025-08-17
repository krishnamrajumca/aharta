'use client'

import React, { useState } from 'react'

// Import components
import CategoriesHeader from '../../components/CategoriesHeader'
import CategoriesGrid from '../../components/CategoriesGrid'
import CategoryModal from '../../components/CategoryModal'
import DeleteConfirmModal from '../../components/DeleteConfirmModal'

// Mock data for menu categories
const menuCategories = [
  { id: 1, name: 'Appetizers', count: 12, color: 'bg-blue-100 text-blue-800', position: 1 },
  { id: 2, name: 'Main Courses', count: 24, color: 'bg-green-100 text-green-800', position: 2 },
  { id: 3, name: 'Desserts', count: 8, color: 'bg-purple-100 text-purple-800', position: 3 },
  { id: 4, name: 'Beverages', count: 15, color: 'bg-orange-100 text-orange-800', position: 4 },
  { id: 5, name: 'Sides', count: 18, color: 'bg-red-100 text-red-800', position: 5 },
  { id: 6, name: 'Specials', count: 6, color: 'bg-yellow-100 text-yellow-800', position: 6 }
]

export default function CategoriesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [selectedColorTheme, setSelectedColorTheme] = useState<string>('')
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{category: any, isOpen: boolean}>({
    category: null,
    isOpen: false
  })
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleDeleteCategory = (category: any) => {
    setShowDeleteConfirm({ category, isOpen: true })
  }

  const handleConfirmDelete = async () => {
    if (!showDeleteConfirm.category) return
    
    setIsDeleting(true)
    try {
      console.log('Deleting category:', showDeleteConfirm.category.id)
      // Here you would implement the actual delete API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Remove from local state (in real app, this would come from API response)
      const updatedCategories = menuCategories.filter(cat => cat.id !== showDeleteConfirm.category.id)
      console.log('Category deleted successfully')
      
      // Close modal and reset state
      setShowDeleteConfirm({ category: null, isOpen: false })
      setIsDeleting(false)
    } catch (error) {
      console.error('Error deleting category:', error)
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm({ category: null, isOpen: false })
    setIsDeleting(false)
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

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingCategory(null)
    setSelectedColorTheme('')
  }

  const handleModalSubmit = () => {
    console.log('Submitting category form')
    // Here you would implement the actual form submission logic
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <CategoriesHeader onAddCategory={handleAddCategory} />

      {/* Categories Grid */}
      <CategoriesGrid
        categories={menuCategories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={showAddModal}
        editingCategory={editingCategory}
        selectedColorTheme={selectedColorTheme}
        onClose={handleModalClose}
        onColorThemeChange={handleColorThemeChange}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm.isOpen}
        type="category"
        itemName={showDeleteConfirm.category?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
