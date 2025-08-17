'use client'

import React from 'react'
import { Package, Edit, Plus, Tag, Users, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface StockItem {
  id: number
  name: string
  category: string
  sku: string
  quantity: number
  unit: string
  price: number
  cost: number
  supplier: string
  status: string
  reorderPoint: number
  lastUpdated: string
  location: string
  expiryDate: string
  minOrder: number
  leadTime: number
}

interface StockCardProps {
  item: StockItem
  onEdit: (item: StockItem) => void
  onRestock: (item: StockItem) => void
}

export default function StockCard({ item, onEdit, onRestock }: StockCardProps) {
  const getStockStatusColor = (status: string) => {
    const statusColors = {
      'in-stock': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'critical': 'bg-red-100 text-red-800',
      'out-of-stock': 'bg-gray-100 text-gray-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  const getStockStatusIcon = (status: string) => {
    const statusIcons = {
      'in-stock': <TrendingUp className="h-3 w-3" />,
      'low-stock': <AlertTriangle className="h-3 w-3" />,
      'critical': <AlertTriangle className="h-3 w-3" />,
      'out-of-stock': <TrendingDown className="h-3 w-3" />
    }
    return statusIcons[status as keyof typeof statusIcons] || <Package className="h-3 w-3" />
  }

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) {
      return { label: 'Expired', color: 'text-red-600' }
    } else if (daysUntilExpiry <= 7) {
      return { label: `${daysUntilExpiry} days`, color: 'text-red-600' }
    } else if (daysUntilExpiry <= 30) {
      return { label: `${daysUntilExpiry} days`, color: 'text-yellow-600' }
    } else {
      return { label: `${daysUntilExpiry} days`, color: 'text-green-600' }
    }
  }

  const getProfitMargin = (price: number, cost: number) => {
    return Math.round(((price - cost) / price) * 100)
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        {/* Header with Status and Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(item.status)}`}>
              {getStockStatusIcon(item.status)}
              <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
            </span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">SKU: {item.sku}</p>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-green-600">${item.price}</div>
            <div className="text-sm text-gray-500">{item.quantity} {item.unit}</div>
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gray-400" />
            {item.category}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            {item.supplier}
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-gray-400" />
            {item.location}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span className={getExpiryStatus(item.expiryDate).color}>
              Expires: {getExpiryStatus(item.expiryDate).label}
            </span>
          </div>
        </div>

        {/* Stock Level Bar */}
        <div className="mb-4">
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

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Margin: {getProfitMargin(item.price, item.cost)}%</span>
          <span>Reorder: {item.reorderPoint} {item.unit}</span>
          <span>Lead Time: {item.leadTime} days</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRestock(item)}
            className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Restock
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
