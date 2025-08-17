'use client'

import React, { useState } from 'react'

// Import components
import VendorsHeader from './components/VendorsHeader'
import VendorsGrid from './components/VendorsGrid'
import VendorModal from './components/VendorModal'

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: 'Coffee Co.',
    type: 'Beverage Supplier',
    contactPerson: 'John Smith',
    email: 'john@coffeeco.com',
    phone: '+1 (555) 123-4567',
    website: 'www.coffeeco.com',
    address: '123 Coffee St, Bean City, BC 12345',
    status: 'active',
    rating: 4.8,
    totalOrders: 156,
    totalSpent: 45230.50,
    lastOrder: '2024-01-15',
    paymentTerms: 'Net 30',
    categories: ['Beverages', 'Coffee', 'Tea'],
    performance: 'excellent',
    leadTime: 3,
    minOrder: 100
  },
  {
    id: 2,
    name: 'Dairy Farm Inc.',
    type: 'Dairy Supplier',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@dairyfarm.com',
    phone: '+1 (555) 234-5678',
    website: 'www.dairyfarm.com',
    address: '456 Milk Ave, Dairy Town, DT 23456',
    status: 'active',
    rating: 4.6,
    totalOrders: 89,
    totalSpent: 28750.25,
    lastOrder: '2024-01-14',
    paymentTerms: 'Net 15',
    categories: ['Dairy', 'Milk', 'Cheese', 'Yogurt'],
    performance: 'good',
    leadTime: 1,
    minOrder: 50
  },
  {
    id: 3,
    name: 'Fresh Produce Co.',
    type: 'Produce Supplier',
    contactPerson: 'Mike Wilson',
    email: 'mike@freshproduce.com',
    phone: '+1 (555) 345-6789',
    website: 'www.freshproduce.com',
    address: '789 Veggie Blvd, Garden City, GC 34567',
    status: 'active',
    rating: 4.9,
    totalOrders: 234,
    totalSpent: 67890.75,
    lastOrder: '2024-01-13',
    paymentTerms: 'Net 30',
    categories: ['Produce', 'Vegetables', 'Fruits', 'Herbs'],
    performance: 'excellent',
    leadTime: 2,
    minOrder: 75
  },
  {
    id: 4,
    name: 'Bakery Supplies Ltd.',
    type: 'Bakery Supplier',
    contactPerson: 'Emily Davis',
    email: 'emily@bakerysupplies.com',
    phone: '+1 (555) 456-7890',
    website: 'www.bakerysupplies.com',
    address: '321 Flour St, Bread City, BC 45678',
    status: 'active',
    rating: 4.7,
    totalOrders: 178,
    totalSpent: 34560.80,
    lastOrder: '2024-01-12',
    paymentTerms: 'Net 30',
    categories: ['Bakery', 'Flour', 'Yeast', 'Baking Supplies'],
    performance: 'good',
    leadTime: 2,
    minOrder: 150
  },
  {
    id: 5,
    name: 'Quality Meats Inc.',
    type: 'Meat Supplier',
    contactPerson: 'David Brown',
    email: 'david@qualitymeats.com',
    phone: '+1 (555) 567-8901',
    website: 'www.qualitymeats.com',
    address: '654 Meat Ave, Carnivore City, CC 56789',
    status: 'active',
    rating: 4.5,
    totalOrders: 145,
    totalSpent: 56780.90,
    lastOrder: '2024-01-11',
    paymentTerms: 'Net 15',
    categories: ['Meat', 'Beef', 'Pork', 'Chicken', 'Lamb'],
    performance: 'good',
    leadTime: 1,
    minOrder: 200
  },
  {
    id: 6,
    name: 'Pantry Essentials',
    type: 'Pantry Supplier',
    contactPerson: 'Lisa Wilson',
    email: 'lisa@pantryessentials.com',
    phone: '+1 (555) 678-9012',
    website: 'www.pantryessentials.com',
    address: '987 Spice Rd, Flavor Town, FT 67890',
    status: 'inactive',
    rating: 4.2,
    totalOrders: 67,
    totalSpent: 12340.60,
    lastOrder: '2023-12-15',
    paymentTerms: 'Net 30',
    categories: ['Pantry', 'Spices', 'Oils', 'Condiments'],
    performance: 'average',
    leadTime: 5,
    minOrder: 100
  }
]

export default function VendorsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPerformance, setSelectedPerformance] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingVendor, setEditingVendor] = useState<any>(null)

  // Filtered vendors based on search and filters
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'all' || vendor.type === selectedType
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus
    const matchesPerformance = selectedPerformance === 'all' || vendor.performance === selectedPerformance
    
    return matchesSearch && matchesType && matchesStatus && matchesPerformance
  })

  // Event handlers
  const handleAddVendor = () => {
    setShowAddModal(true)
    setEditingVendor(null)
  }

  const handleEditVendor = (vendor: any) => {
    setEditingVendor(vendor)
    setShowAddModal(true)
  }

  const handleViewVendor = (vendor: any) => {
    console.log('Viewing vendor:', vendor.name)
  }

  const handleExport = () => {
    console.log('Exporting vendor data')
  }

  const handleImport = () => {
    console.log('Importing vendor data')
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingVendor(null)
  }

  const handleModalSubmit = () => {
    console.log('Submitting vendor form')
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <VendorsHeader 
        onAddVendor={handleAddVendor}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Vendor Grid */}
      {viewMode === 'grid' && (
        <VendorsGrid
          vendors={filteredVendors}
          onEdit={handleEditVendor}
          onView={handleViewVendor}
        />
      )}

      {/* Add/Edit Vendor Modal */}
      <VendorModal
        isOpen={showAddModal}
        editingVendor={editingVendor}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
