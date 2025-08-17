'use client'

import React, { useState } from 'react'
import { 
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  GripVertical,
  X,
  ShoppingBag,
  Heart,
  Clock,
  CheckSquare,
  Square,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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
    dateOfBirth: '1987-12-01',
    preferences: ['Mediterranean', 'Healthy', 'Organic'],
    notes: 'Health conscious, orders weekly',
    joinDate: '2022-12-01',
    customerType: 'vip',
    source: 'social-media'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, District, State 56789',
    status: 'active',
    totalOrders: 38,
    totalSpent: 1450.80,
    lastOrder: '2024-01-13',
    dateOfBirth: '1983-04-15',
    preferences: ['Mexican', 'Spicy', 'Family'],
    notes: 'Family orders, large portions',
    joinDate: '2023-04-15',
    customerType: 'regular',
    source: 'website'
  }
]

// Enhanced filter options
const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const customerTypeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'regular', label: 'Regular' },
  { value: 'premium', label: 'Premium' },
  { value: 'vip', label: 'VIP' }
]

const sourceOptions: DropdownOption[] = [
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'walk-in', label: 'Walk-in' },
  { value: 'social-media', label: 'Social Media' }
]

const orderRangeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Orders' },
  { value: '0-10', label: '0-10 orders' },
  { value: '11-25', label: '11-25 orders' },
  { value: '26-50', label: '26-50 orders' },
  { value: '50+', label: '50+ orders' }
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function CustomersPage() {
  // Enhanced state management
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCustomerType, setSelectedCustomerType] = useState<string>('all')
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [selectedOrderRange, setSelectedOrderRange] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [selectedCustomers, setSelectedCustomers] = useState<Set<number>>(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [spendingRange, setSpendingRange] = useState<{min: string, max: string}>({min: '', max: ''})
  const [joinDateRange, setJoinDateRange] = useState<{start: string, end: string}>({start: '', end: ''})

  // Enhanced filtering with advanced options
  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    const matchesCustomerType = selectedCustomerType === 'all' || customer.customerType === selectedCustomerType
    const matchesSource = selectedSource === 'all' || customer.source === selectedSource
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery)
    
    // Advanced filters
    const matchesOrderRange = selectedOrderRange === 'all' || 
      (selectedOrderRange === '0-10' && customer.totalOrders >= 0 && customer.totalOrders <= 10) ||
      (selectedOrderRange === '11-25' && customer.totalOrders >= 11 && customer.totalOrders <= 25) ||
      (selectedOrderRange === '26-50' && customer.totalOrders >= 26 && customer.totalOrders <= 50) ||
      (selectedOrderRange === '50+' && customer.totalOrders > 50)
    
    const matchesSpending = (!spendingRange.min || customer.totalSpent >= parseFloat(spendingRange.min)) &&
                           (!spendingRange.max || customer.totalSpent <= parseFloat(spendingRange.max))
    
    const matchesJoinDate = (!joinDateRange.start || customer.joinDate >= joinDateRange.start) &&
                           (!joinDateRange.end || customer.joinDate <= joinDateRange.end)

    return matchesStatus && matchesCustomerType && matchesSource && matchesSearch && 
           matchesOrderRange && matchesSpending && matchesJoinDate
  })

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'regular': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Event handlers
  const openAddModal = () => {
    setShowAddModal(true)
    setEditingCustomer(null)
  }

  const openEditModal = (customer: any) => {
    setEditingCustomer(customer)
    setShowAddModal(true)
  }

  const resetModalState = () => {
    setShowAddModal(false)
    setEditingCustomer(null)
  }

  const handleDeleteCustomer = (customerId: number) => {
    setShowDeleteConfirm(customerId)
  }

  const confirmDeleteCustomer = (customerId: number) => {
    console.log('Deleting customer:', customerId)
    setShowDeleteConfirm(null)
    // In real app, would call API to delete
  }

  // Bulk operations
  const handleSelectAll = () => {
    if (selectedCustomers.size === filteredCustomers.length) {
      setSelectedCustomers(new Set())
    } else {
      setSelectedCustomers(new Set(filteredCustomers.map(c => c.id)))
    }
  }

  const handleSelectCustomer = (customerId: number) => {
    const newSelected = new Set(selectedCustomers)
    if (newSelected.has(customerId)) {
      newSelected.delete(customerId)
    } else {
      newSelected.add(customerId)
    }
    setSelectedCustomers(newSelected)
  }

  const handleBulkStatusChange = (status: string) => {
    console.log('Bulk status change to:', status, 'for customers:', Array.from(selectedCustomers))
    setSelectedCustomers(new Set())
    setShowBulkActions(false)
  }

  const handleBulkDelete = () => {
    console.log('Bulk delete customers:', Array.from(selectedCustomers))
    setSelectedCustomers(new Set())
    setShowBulkActions(false)
  }

  const resetFilters = () => {
    setSelectedStatus('all')
    setSelectedCustomerType('all')
    setSelectedSource('all')
    setSelectedOrderRange('all')
    setSearchQuery('')
    setSpendingRange({min: '', max: ''})
    setJoinDateRange({start: '', end: ''})
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage customer relationships and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedCustomers.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedCustomers.size} selected</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                Bulk Actions
                {showBulkActions ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          )}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={openAddModal} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Bulk Actions Dropdown */}
      {showBulkActions && selectedCustomers.size > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-800">Bulk Actions for {selectedCustomers.size} customers:</span>
              <div className="flex items-center space-x-2">
                <Dropdown
                  options={[
                    { value: 'active', label: 'Activate' },
                    { value: 'inactive', label: 'Deactivate' }
                  ]}
                  value=""
                  onChange={(value) => handleBulkStatusChange(Array.isArray(value) ? value[0] : value)}
                  placeholder="Change Status"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Filters and Search */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Basic Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search customers by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Dropdown
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={(value) => setSelectedStatus(Array.isArray(value) ? value[0] : value)}
                  placeholder="Status"
                  className="min-w-[150px]"
                />

                <Dropdown
                  options={customerTypeOptions}
                  value={selectedCustomerType}
                  onChange={(value) => setSelectedCustomerType(Array.isArray(value) ? value[0] : value)}
                  placeholder="Type"
                  className="min-w-[150px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? 'Hide' : 'Advanced'} Filters
                </Button>
                <Dropdown
                  options={viewModeOptions}
                  value={viewMode}
                  onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
                  placeholder="View"
                  className="w-32"
                />
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Dropdown
                    options={sourceOptions}
                    value={selectedSource}
                    onChange={(value) => setSelectedSource(Array.isArray(value) ? value[0] : value)}
                    placeholder="Source"
                  />
                  <Dropdown
                    options={orderRangeOptions}
                    value={selectedOrderRange}
                    onChange={(value) => setSelectedOrderRange(Array.isArray(value) ? value[0] : value)}
                    placeholder="Order Range"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Spending Range</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Min"
                        value={spendingRange.min}
                        onChange={(e) => setSpendingRange({...spendingRange, min: e.target.value})}
                        className="w-20"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <Input
                        placeholder="Max"
                        value={spendingRange.max}
                        onChange={(e) => setSpendingRange({...spendingRange, max: e.target.value})}
                        className="w-20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={joinDateRange.start}
                        onChange={(e) => setJoinDateRange({...joinDateRange, start: e.target.value})}
                        className="w-32"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <Input
                        type="date"
                        value={joinDateRange.end}
                        onChange={(e) => setJoinDateRange({...joinDateRange, end: e.target.value})}
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Total Customers</p>
                <p className="text-xl font-bold text-blue-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Active Customers</p>
                <p className="text-xl font-bold text-green-900">{customers.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800">Total Orders</p>
                <p className="text-xl font-bold text-purple-900">{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">VIP Customers</p>
                <p className="text-xl font-bold text-orange-900">{customers.filter(c => c.customerType === 'vip').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Customers Section with Bulk Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Customers</h2>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">{filteredCustomers.length} customers found</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="flex items-center space-x-2"
              >
                {selectedCustomers.size === filteredCustomers.length ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span>{selectedCustomers.size === filteredCustomers.length ? 'Deselect All' : 'Select All'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Customers Grid/List with Enhanced Features */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <Card 
                key={customer.id} 
                className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Selection Checkbox and Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.has(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(customer)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{customer.name}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{customer.address}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Orders</span>
                      <span className="text-sm font-medium text-gray-900">{customer.totalOrders}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Spent</span>
                      <span className="text-sm font-bold text-green-600">{formatCurrency(customer.totalSpent)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date of Birth</span>
                      <span className="text-sm font-medium text-gray-900">{customer.dateOfBirth}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCustomerTypeColor(customer.customerType)}`}>
                      {customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}
                    </span>
                    {customer.preferences.slice(0, 2).map(preference => (
                      <span key={preference} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {preference}
                      </span>
                    ))}
                    {customer.preferences.length > 2 && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        +{customer.preferences.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(customer)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <Card 
                key={customer.id} 
                className="hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedCustomers.has(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCheck className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCustomerTypeColor(customer.customerType)}`}>
                            {customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          DOB: {customer.dateOfBirth}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Last order {customer.lastOrder}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>Preferences:</span>
                          <div className="flex flex-wrap gap-1">
                            {customer.preferences.map(preference => (
                              <span key={preference} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                {preference}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(customer)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Add/Edit Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
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
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input defaultValue={editingCustomer?.name || ''} placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" defaultValue={editingCustomer?.email || ''} placeholder="Enter email" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input defaultValue={editingCustomer?.phone || ''} placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                  <Dropdown
                    options={customerTypeOptions.filter(opt => opt.value !== 'all')}
                    value={editingCustomer?.customerType || 'regular'}
                    onChange={(value) => console.log('Customer type changed:', value)}
                    placeholder="Select type"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter full address"
                  defaultValue={editingCustomer?.address || ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={statusOptions.filter(opt => opt.value !== 'all')}
                    value={editingCustomer?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <Input type="date" defaultValue={editingCustomer?.dateOfBirth || ''} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter customer notes or preferences"
                  defaultValue={editingCustomer?.notes || ''}
                />
              </div>

            </CardContent>
            <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={resetModalState}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this customer? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => confirmDeleteCustomer(showDeleteConfirm)}
                  >
                    Delete
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
