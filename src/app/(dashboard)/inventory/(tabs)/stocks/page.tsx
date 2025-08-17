'use client'

import React, { useState } from 'react'

// Import components
import StocksHeader from './components/StocksHeader'
import StocksGrid from './components/StocksGrid'
import StockModal from './components/StockModal'

// Mock data for stock items
const stockItems = [
  {
    id: 1,
    name: 'Premium Coffee Beans',
    category: 'Beverages',
    sku: 'COF-001',
    quantity: 150,
    unit: 'kg',
    price: 25.99,
    cost: 18.50,
    supplier: 'Coffee Co.',
    status: 'in-stock',
    reorderPoint: 50,
    lastUpdated: '2024-01-15',
    location: 'Warehouse A',
    expiryDate: '2024-06-15',
    minOrder: 25,
    leadTime: 3
  },
  {
    id: 2,
    name: 'Organic Milk',
    category: 'Dairy',
    sku: 'DAI-001',
    quantity: 45,
    unit: 'L',
    price: 4.99,
    cost: 3.20,
    supplier: 'Dairy Farm',
    status: 'low-stock',
    reorderPoint: 60,
    lastUpdated: '2024-01-15',
    location: 'Cold Storage',
    expiryDate: '2024-01-25',
    minOrder: 50,
    leadTime: 1
  },
  {
    id: 3,
    name: 'Fresh Eggs',
    category: 'Dairy',
    sku: 'DAI-002',
    quantity: 200,
    unit: 'dozen',
    price: 6.99,
    cost: 4.80,
    supplier: 'Egg Farm',
    status: 'in-stock',
    reorderPoint: 100,
    lastUpdated: '2024-01-14',
    location: 'Cold Storage',
    expiryDate: '2024-02-14',
    minOrder: 50,
    leadTime: 2
  },
  {
    id: 4,
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    sku: 'BAK-001',
    quantity: 25,
    unit: 'loaves',
    price: 3.99,
    cost: 2.50,
    supplier: 'Bakery Co.',
    status: 'critical',
    reorderPoint: 30,
    lastUpdated: '2024-01-15',
    location: 'Kitchen',
    expiryDate: '2024-01-20',
    minOrder: 20,
    leadTime: 1
  },
  {
    id: 5,
    name: 'Fresh Tomatoes',
    category: 'Produce',
    sku: 'PRO-001',
    quantity: 80,
    unit: 'kg',
    price: 8.99,
    cost: 5.50,
    supplier: 'Fresh Farms',
    status: 'in-stock',
    reorderPoint: 40,
    lastUpdated: '2024-01-15',
    location: 'Cold Storage',
    expiryDate: '2024-01-30',
    minOrder: 30,
    leadTime: 2
  },
  {
    id: 6,
    name: 'Chicken Breast',
    category: 'Meat',
    sku: 'MEA-001',
    quantity: 60,
    unit: 'kg',
    price: 12.99,
    cost: 8.80,
    supplier: 'Quality Meats',
    status: 'in-stock',
    reorderPoint: 50,
    lastUpdated: '2024-01-15',
    location: 'Freezer',
    expiryDate: '2024-03-15',
    minOrder: 25,
    leadTime: 3
  }
]

export default function StocksPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Filtered items based on search and filters
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Event handlers
  const handleAddStock = () => {
    setShowAddModal(true)
    setEditingItem(null)
  }

  const handleEditStock = (item: any) => {
    setEditingItem(item)
    setShowAddModal(true)
  }

  const handleRestock = (item: any) => {
    console.log('Restocking item:', item.name)
  }

  const handleExport = () => {
    console.log('Exporting stock data')
  }

  const handleImport = () => {
    console.log('Importing stock data')
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingItem(null)
  }

  const handleModalSubmit = () => {
    console.log('Submitting stock form')
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <StocksHeader 
        onAddStock={handleAddStock}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Stock Grid */}
      {viewMode === 'grid' && (
        <StocksGrid
          stocks={filteredItems}
          onEdit={handleEditStock}
          onRestock={handleRestock}
        />
      )}

      {/* Add/Edit Stock Modal */}
      <StockModal
        isOpen={showAddModal}
        editingItem={editingItem}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
