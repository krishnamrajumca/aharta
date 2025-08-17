'use client'

import React from 'react'
import { UserCheck, Edit, Eye, Mail, Phone, MapPin, Calendar, Star, ShoppingBag, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  status: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  dateOfBirth: string
  preferences: string[]
  notes: string
  joinDate: string
  customerType: string
  source: string
}

interface CustomerCardProps {
  customer: Customer
  onEdit: (customer: Customer) => void
  onView: (customer: Customer) => void
}

export default function CustomerCard({ customer, onEdit, onView }: CustomerCardProps) {
  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  const getCustomerTypeColor = (type: string) => {
    const typeColors = {
      regular: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
      vip: 'bg-yellow-100 text-yellow-800',
      new: 'bg-green-100 text-green-800'
    }
    return typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        {/* Header with Status and Customer Type */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <UserCheck className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCustomerTypeColor(customer.customerType)}`}>
              {customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}
            </span>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{customer.name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Age: {getAge(customer.dateOfBirth)}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">Joined: {formatDate(customer.joinDate)}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            {customer.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {customer.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{customer.address}</span>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Orders</span>
            <div className="flex items-center space-x-1">
              <ShoppingBag className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">{customer.totalOrders}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Spent</span>
            <span className="text-sm font-bold text-green-600">{formatCurrency(customer.totalSpent)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Order</span>
            <span className="text-sm font-medium text-gray-900">{formatDate(customer.lastOrder)}</span>
          </div>
        </div>

        {/* Preferences */}
        {customer.preferences.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Heart className="h-4 w-4" />
              <span>Preferences:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {customer.preferences.slice(0, 3).map(preference => (
                <span key={preference} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {preference}
                </span>
              ))}
              {customer.preferences.length > 3 && (
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  +{customer.preferences.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {customer.notes && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-xs text-yellow-600 font-medium">Notes:</span>
              <span className="text-xs text-yellow-800">{customer.notes}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(customer)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(customer)}
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
