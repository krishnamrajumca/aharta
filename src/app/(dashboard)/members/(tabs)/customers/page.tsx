'use client'

import React, { useState } from 'react'

// Import components
import CustomersHeader from './components/CustomersHeader'
import CustomersGrid from './components/CustomersGrid'
import CustomerModal from './components/CustomerModal'

// Enhanced mock data for customers
const customers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    status: 'active',
    totalOrders: 45,
    totalSpent: 1250.75,
    lastOrder: '2024-01-15',
    dateOfBirth: '1985-03-15',
    preferences: ['Italian', 'Spicy', 'Vegetarian'],
    notes: 'Prefers delivery, tip generously',
    joinDate: '2023-03-15',
    customerType: 'regular',
    source: 'website'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Town, State 23456',
    status: 'active',
    totalOrders: 28,
    totalSpent: 890.50,
    lastOrder: '2024-01-14',
    dateOfBirth: '1990-06-20',
    preferences: ['Asian', 'Mild', 'Seafood'],
    notes: 'Loves sushi, allergic to nuts',
    joinDate: '2023-06-20',
    customerType: 'premium',
    source: 'referral'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Rd, Village, State 34567',
    status: 'inactive',
    totalOrders: 12,
    totalSpent: 320.25,
    lastOrder: '2023-11-30',
    dateOfBirth: '1988-09-10',
    preferences: ['American', 'Classic', 'Meat'],
    notes: 'Prefers pickup, busy schedule',
    joinDate: '2023-09-10',
    customerType: 'regular',
    source: 'walk-in'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Borough, State 45678',
    status: 'active',
    totalOrders: 67,
    totalSpent: 2100.00,
    lastOrder: '2024-01-16',
    dateOfBirth: '1992-12-05',
    preferences: ['Mediterranean', 'Fusion', 'Vegetarian'],
    notes: 'VIP customer, special attention required',
    joinDate: '2023-01-15',
    customerType: 'vip',
    source: 'website'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, District, State 56789',
    status: 'active',
    totalOrders: 34,
    totalSpent: 1567.80,
    lastOrder: '2024-01-13',
    dateOfBirth: '1987-07-22',
    preferences: ['Mexican', 'Spicy', 'Meat'],
    notes: 'Loves hot sauce, orders frequently',
    joinDate: '2023-04-10',
    customerType: 'premium',
    source: 'social-media'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 678-9012',
    address: '987 Cedar Ln, County, State 67890',
    status: 'pending',
    totalOrders: 3,
    totalSpent: 89.50,
    lastOrder: '2024-01-10',
    dateOfBirth: '1995-02-18',
    preferences: ['American', 'Classic', 'Mild'],
    notes: 'New customer, still exploring menu',
    joinDate: '2024-01-05',
    customerType: 'new',
    source: 'advertising'
  }
]

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCustomerType, setSelectedCustomerType] = useState('all')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)

  // Filtered customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery)
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    const matchesType = selectedCustomerType === 'all' || customer.customerType === selectedCustomerType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Event handlers
  const handleAddCustomer = () => {
    setShowAddModal(true)
    setEditingCustomer(null)
  }

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer(customer)
    setShowAddModal(true)
  }

  const handleViewCustomer = (customer: any) => {
    console.log('Viewing customer:', customer.name)
  }

  const handleExport = () => {
    console.log('Exporting customers data')
  }

  const handleImport = () => {
    console.log('Importing customers data')
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingCustomer(null)
  }

  const handleModalSubmit = () => {
    console.log('Submitting customer form')
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <CustomersHeader 
        onAddCustomer={handleAddCustomer}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Customers Grid */}
      {viewMode === 'grid' && (
        <CustomersGrid
          customers={filteredCustomers}
          onEdit={handleEditCustomer}
          onView={handleViewCustomer}
        />
      )}

      {/* Add/Edit Customer Modal */}
      <CustomerModal
        isOpen={showAddModal}
        editingCustomer={editingCustomer}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
