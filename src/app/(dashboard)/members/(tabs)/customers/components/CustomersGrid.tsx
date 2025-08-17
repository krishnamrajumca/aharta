'use client'

import React from 'react'
import CustomerCard from './CustomerCard'

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

interface CustomersGridProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onView: (customer: Customer) => void
}

export default function CustomersGrid({ customers, onEdit, onView }: CustomersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  )
}
