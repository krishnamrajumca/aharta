'use client'

import React from 'react'
import VendorCard from './VendorCard'

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

interface VendorsGridProps {
  vendors: Vendor[]
  onEdit: (vendor: Vendor) => void
  onView: (vendor: Vendor) => void
}

export default function VendorsGrid({ vendors, onEdit, onView }: VendorsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  )
}
