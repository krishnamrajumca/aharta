'use client'

import React from 'react'
import { Building2, Edit, Eye, Star, Phone, Mail, MapPin, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Vendor {
  id: number
  name: string
  type: string
  contactPerson: string
  email: string
  phone: string
  website: string
  address: string
  status: string
  rating: number
  totalOrders: number
  totalSpent: number
  lastOrder: string
  paymentTerms: string
  categories: string[]
  performance: string
  leadTime: number
  minOrder: number
}

interface VendorCardProps {
  vendor: Vendor
  onEdit: (vendor: Vendor) => void
  onView: (vendor: Vendor) => void
}

export default function VendorCard({ vendor, onEdit, onView }: VendorCardProps) {
  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  const getPerformanceColor = (performance: string) => {
    const performanceColors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      average: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800'
    }
    return performanceColors[performance as keyof typeof performanceColors] || 'bg-gray-100 text-gray-800'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        {/* Header with Status and Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor.status)}`}>
              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(vendor.performance)}`}>
              {vendor.performance.charAt(0).toUpperCase() + vendor.performance.slice(1)}
            </span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{vendor.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{vendor.type}</p>
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">{vendor.rating}</span>
            <span className="text-sm text-gray-500">({vendor.totalOrders} orders)</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            {vendor.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {vendor.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{vendor.address}</span>
          </div>
        </div>

        {/* Performance Metrics */}
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

        {/* Categories */}
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
            onClick={() => onEdit(vendor)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(vendor)}
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
