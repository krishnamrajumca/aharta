'use client'

import React, { useState } from 'react'
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'

// Import components
import DashboardHeader from './components/DashboardHeader'
import StatsCard from './components/StatsCard'
import ChartCard from './components/ChartCard'
import RecentOrdersTable from './components/RecentOrdersTable'
import QuickActions from './components/QuickActions'

// Mock data for dashboard
const recentOrders = [
  { id: 1, customer: 'John Doe', amount: 89.99, status: 'completed' as const, date: '2024-01-15' },
  { id: 2, customer: 'Jane Smith', amount: 156.50, status: 'pending' as const, date: '2024-01-15' },
  { id: 3, customer: 'Mike Johnson', amount: 234.00, status: 'processing' as const, date: '2024-01-14' },
  { id: 4, customer: 'Sarah Wilson', amount: 67.25, status: 'completed' as const, date: '2024-01-14' },
  { id: 5, customer: 'David Brown', amount: 189.99, status: 'pending' as const, date: '2024-01-13' }
]

const quickActions = [
  { title: 'New Order', description: 'Create a new customer order', icon: ShoppingCart, color: 'bg-blue-500' },
  { title: 'Add Customer', description: 'Register a new customer', icon: Users, color: 'bg-green-500' },
  { title: 'View Reports', description: 'Access detailed analytics', icon: TrendingUp, color: 'bg-purple-500' },
  { title: 'Inventory Check', description: 'Review stock levels', icon: Users, color: 'bg-orange-500' }
]

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('month')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const handleTimeRangeChange = (value: string | string[]) => {
    setSelectedTimeRange(Array.isArray(value) ? value[0] : value)
  }

  const handleStatusChange = (value: string | string[]) => {
    setSelectedStatus(Array.isArray(value) ? value[0] : value)
  }

  const filteredOrders = recentOrders.filter(order => {
    return selectedStatus === 'all' || order.status === selectedStatus
  })

  const statsData = [
    {
      icon: TrendingUp,
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1% from last month',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Total Customers',
      value: '2,350',
      change: '+180.1% from last month',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100'
    },
    {
      icon: ShoppingCart,
      title: 'Total Orders',
      value: '1,234',
      change: '+19% from last month',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100'
    },
    {
      icon: DollarSign,
      title: 'Average Order',
      value: '$36.65',
      change: '+4.3% from last month',
      iconColor: 'text-orange-600',
      iconBgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <DashboardHeader 
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          icon={TrendingUp}
          title="Revenue Overview"
          description="Monthly revenue performance"
        >
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart placeholder</p>
              <p className="text-sm text-gray-400">Revenue visualization will appear here</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          icon={Users}
          title="Customer Growth"
          description="New customer acquisition"
        >
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart placeholder</p>
              <p className="text-sm text-gray-400">Customer growth visualization will appear here</p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable
        orders={filteredOrders}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />
    </div>
  )
}
