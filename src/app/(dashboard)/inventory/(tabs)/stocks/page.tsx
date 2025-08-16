'use client'

import React, { useState } from 'react'
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Grid3X3,
  List,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  BarChart3,
  Clock,
  DollarSign,
  Tag,
  GripVertical,
  X,
  Users
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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
    lastUpdated: '2024-01-14',
    location: 'Warehouse B',
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
    cost: 6.20,
    supplier: 'Veggie Farm',
    status: 'in-stock',
    reorderPoint: 40,
    lastUpdated: '2024-01-13',
    location: 'Cold Storage',
    expiryDate: '2024-01-25',
    minOrder: 30,
    leadTime: 2
  }
]

const stockCategories = [
  { id: 1, name: 'Beverages', count: 45, color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Dairy', count: 32, color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Bakery', count: 28, color: 'bg-yellow-100 text-yellow-800' },
  { id: 4, name: 'Produce', count: 38, color: 'bg-red-100 text-red-800' },
  { id: 5, name: 'Meat', count: 25, color: 'bg-purple-100 text-purple-800' },
  { id: 6, name: 'Pantry', count: 42, color: 'bg-orange-100 text-orange-800' }
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-stock', label: 'Low Stock' },
  { value: 'critical', label: 'Critical' },
  { value: 'out-of-stock', label: 'Out of Stock' }
]

const categoryOptions: DropdownOption[] = [
  { value: 'all', label: 'All Categories' },
  ...stockCategories.map(category => ({ value: category.name, label: category.name }))
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function StocksPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const filteredItems = stockItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800'
      case 'low-stock': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      case 'out-of-stock': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <TrendingUp className="h-4 w-4" />
      case 'low-stock': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'out-of-stock': return <TrendingDown className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryStatus = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate)
    if (days < 0) return { color: 'text-red-600', label: 'Expired' }
    if (days <= 3) return { color: 'text-red-600', label: `${days} days` }
    if (days <= 7) return { color: 'text-yellow-600', label: `${days} days` }
    return { color: 'text-green-600', label: `${days} days` }
  }

  const openAddModal = () => {
    setShowAddModal(true)
    setEditingItem(null)
  }

  const openEditModal = (item: any) => {
    setEditingItem(item)
    setShowAddModal(true)
  }

  const resetModalState = () => {
    setShowAddModal(false)
    setEditingItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600">Track and manage your inventory stock levels</p>
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
            Add Stock Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, SKU, or supplier..."
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
            options={statusOptions}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(Array.isArray(value) ? value[0] : value)}
            placeholder="Status"
          />
          <Dropdown
            options={viewModeOptions}
            value={viewMode}
            onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
            placeholder="View"
          />
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Critical Stock</p>
                <p className="text-xl font-bold text-red-900">3 items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Low Stock</p>
                <p className="text-xl font-bold text-yellow-900">8 items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Expiring Soon</p>
                <p className="text-xl font-bold text-orange-900">5 items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Items Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(item.status)}`}>
                    {getStockStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                  </span>
                  <span className="text-xs text-gray-400">SKU: {item.sku}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <span className="text-lg font-bold text-gray-900">{item.quantity} {item.unit}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price</span>
                    <span className="text-lg font-bold text-green-600">${item.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reorder Point</span>
                    <span className="text-sm font-medium text-gray-900">{item.reorderPoint} {item.unit}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {item.category}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {item.supplier}
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                </div>

                {/* Expiry Warning */}
                {getDaysUntilExpiry(item.expiryDate) <= 7 && (
                  <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center text-sm text-red-700">
                      <Clock className="h-4 w-4 mr-1" />
                      Expires in {getExpiryStatus(item.expiryDate).label}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
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
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Restock
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
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(item.status)}`}>
                            {getStockStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">${item.price}</div>
                        <div className="text-sm text-gray-500">{item.quantity} {item.unit}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {item.supplier}
                      </span>
                      <span className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {item.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Expires: {getExpiryStatus(item.expiryDate).label}
                      </span>
                    </div>

                    {/* Stock Level Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Stock Level</span>
                        <span>{item.quantity} / {item.reorderPoint + item.quantity} {item.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.quantity <= item.reorderPoint ? 'bg-red-500' : 
                            item.quantity <= item.reorderPoint * 1.5 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((item.quantity / (item.reorderPoint + item.quantity)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
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
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Restock
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Stock Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingItem ? 'Edit Stock Item' : 'Add New Stock Item'}
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
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <Input defaultValue={editingItem?.name || ''} placeholder="Enter item name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <Input defaultValue={editingItem?.sku || ''} placeholder="Enter SKU" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Dropdown
                    options={stockCategories.map(cat => ({ value: cat.name, label: cat.name }))}
                    value={editingItem?.category || ''}
                    onChange={(value) => console.log('Category changed:', value)}
                    placeholder="Select category"
                    searchable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <Input defaultValue={editingItem?.unit || ''} placeholder="e.g., kg, L, pieces" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <Input type="number" defaultValue={editingItem?.quantity || ''} placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                  <Input type="number" defaultValue={editingItem?.reorderPoint || ''} placeholder="0" />
                </div>
              </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <Input defaultValue={editingItem?.supplier || ''} placeholder="Enter supplier name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Input defaultValue={editingItem?.location || ''} placeholder="e.g., Warehouse A" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <Input type="date" defaultValue={editingItem?.expiryDate || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
                  <Input type="number" defaultValue={editingItem?.leadTime || ''} placeholder="0" />
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
