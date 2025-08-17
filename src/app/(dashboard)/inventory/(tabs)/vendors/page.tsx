'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Star,
  Phone,
  Mail,
  MapPin,
  Globe,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  Building2,
  Clock,
  DollarSign,
  Tag,
  GripVertical,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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
    contactPerson: 'Lisa Brown',
    email: 'lisa@bakerysupplies.com',
    phone: '+1 (555) 456-7890',
    website: 'www.bakerysupplies.com',
    address: '321 Flour St, Bread City, BC 45678',
    status: 'active',
    rating: 4.4,
    totalOrders: 67,
    totalSpent: 18950.00,
    lastOrder: '2024-01-12',
    paymentTerms: 'Net 45',
    categories: ['Bakery', 'Flour', 'Sugar', 'Yeast'],
    performance: 'good',
    leadTime: 2,
    minOrder: 150
  },
  {
    id: 5,
    name: 'Meat & Poultry Co.',
    type: 'Meat Supplier',
    contactPerson: 'David Lee',
    email: 'david@meatpoultry.com',
    phone: '+1 (555) 567-8901',
    website: 'www.meatpoultry.com',
    address: '654 Meat Ave, Carnivore City, CC 56789',
    status: 'inactive',
    rating: 4.2,
    totalOrders: 45,
    totalSpent: 12340.80,
    lastOrder: '2024-01-10',
    paymentTerms: 'Net 30',
    categories: ['Meat', 'Poultry', 'Beef', 'Pork'],
    performance: 'fair',
    leadTime: 4,
    minOrder: 200
  }
]

const vendorTypes = [
  { id: 1, name: 'Beverage Supplier', count: 12, color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Dairy Supplier', count: 8, color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Produce Supplier', count: 15, color: 'bg-red-100 text-red-800' },
  { id: 4, name: 'Bakery Supplier', count: 6, color: 'bg-yellow-100 text-yellow-800' },
  { id: 5, name: 'Meat Supplier', count: 10, color: 'bg-purple-100 text-purple-800' },
  { id: 6, name: 'Pantry Supplier', count: 18, color: 'bg-orange-100 text-orange-800' }
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
]

const performanceOptions: DropdownOption[] = [
  { value: 'all', label: 'All Performance' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
]

const typeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Types' },
  ...vendorTypes.map(type => ({ value: type.name, label: type.name }))
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function VendorsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPerformance, setSelectedPerformance] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingVendor, setEditingVendor] = useState<any>(null)

  const filteredVendors = vendors.filter(vendor => {
    const matchesType = selectedType === 'all' || vendor.type === selectedType
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus
    const matchesPerformance = selectedPerformance === 'all' || vendor.performance === selectedPerformance
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesPerformance && matchesSearch
  })

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'fair': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const openAddModal = () => {
    setShowAddModal(true)
    setEditingVendor(null)
  }

  const openEditModal = (vendor: any) => {
    setEditingVendor(vendor)
    setShowAddModal(true)
  }

  const resetModalState = () => {
    setShowAddModal(false)
    setEditingVendor(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vendor Management</h2>
          <p className="text-gray-600">Manage your suppliers and vendor relationships</p>
        </div>
        <div className="flex items-center space-x-3">
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
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, contact person, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Dropdown
            options={typeOptions}
            value={selectedType}
            onChange={(value) => setSelectedType(Array.isArray(value) ? value[0] : value)}
            placeholder="Type"
            searchable
          />
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(Array.isArray(value) ? value[0] : value)}
            placeholder="Status"
          />
          <Dropdown
            options={performanceOptions}
            value={selectedPerformance}
            onChange={(value) => setSelectedPerformance(Array.isArray(value) ? value[0] : value)}
            placeholder="Performance"
          />
          <Dropdown
            options={viewModeOptions}
            value={viewMode}
            onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
            placeholder="View"
          />
        </div>
      </div>

      {/* Vendor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Total Vendors</p>
                <p className="text-xl font-bold text-blue-900">{vendors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Active Vendors</p>
                <p className="text-xl font-bold text-green-900">{vendors.filter(v => v.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800">Top Rated</p>
                <p className="text-xl font-bold text-purple-900">{vendors.filter(v => v.rating >= 4.5).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Total Spent</p>
                <p className="text-xl font-bold text-orange-900">
                  {formatCurrency(vendors.reduce((sum, v) => sum + v.totalSpent, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor.status)}`}>
                    {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{vendor.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {vendor.contactPerson}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {vendor.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {vendor.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{vendor.address}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="text-sm font-medium text-gray-900">{vendor.totalOrders}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="text-sm font-bold text-green-600">{formatCurrency(vendor.totalSpent)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(vendor.performance)}`}>
                      {vendor.performance.charAt(0).toUpperCase() + vendor.performance.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vendor.categories.slice(0, 3).map(category => (
                    <span key={category} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {category}
                    </span>
                  ))}
                  {vendor.categories.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      +{vendor.categories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(vendor)}
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
          {filteredVendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                          <p className="text-sm text-gray-600">{vendor.type}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor.status)}`}>
                            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(vendor.performance)}`}>
                            {vendor.performance.charAt(0).toUpperCase() + vendor.performance.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold text-gray-900">{vendor.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">{formatCurrency(vendor.totalSpent)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {vendor.contactPerson}
                      </span>
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {vendor.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {vendor.phone}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {vendor.leadTime} days lead time
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Categories:</span>
                        <div className="flex flex-wrap gap-1">
                          {vendor.categories.map(category => (
                            <span key={category} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {category}
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
                      onClick={() => openEditModal(vendor)}
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

      {/* Add/Edit Vendor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                  <Input defaultValue={editingVendor?.name || ''} placeholder="Enter vendor name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <Dropdown
                    options={vendorTypes.map(type => ({ value: type.name, label: type.name }))}
                    value={editingVendor?.type || ''}
                    onChange={(value) => console.log('Type changed:', value)}
                    placeholder="Select type"
                    searchable
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <Input defaultValue={editingVendor?.contactPerson || ''} placeholder="Enter contact person" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" defaultValue={editingVendor?.email || ''} placeholder="Enter email" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input defaultValue={editingVendor?.phone || ''} placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <Input defaultValue={editingVendor?.website || ''} placeholder="Enter website" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter full address"
                  defaultValue={editingVendor?.address || ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'pending', label: 'Pending' }
                    ]}
                    value={editingVendor?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <Input defaultValue={editingVendor?.paymentTerms || ''} placeholder="e.g., Net 30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
                  <Input type="number" defaultValue={editingVendor?.leadTime || ''} placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order</label>
                  <Input type="number" defaultValue={editingVendor?.minOrder || ''} placeholder="0" />
                </div>
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
                  {editingVendor ? 'Update Vendor' : 'Add Vendor'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
