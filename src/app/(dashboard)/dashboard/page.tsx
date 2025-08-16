'use client'

import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Calendar,
  Filter,
  MoreHorizontal,
  Eye,
  Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for dashboard
const recentOrders = [
  { id: 1, customer: 'John Doe', amount: 89.99, status: 'completed', date: '2024-01-15' },
  { id: 2, customer: 'Jane Smith', amount: 156.50, status: 'pending', date: '2024-01-15' },
  { id: 3, customer: 'Mike Johnson', amount: 234.00, status: 'processing', date: '2024-01-14' },
  { id: 4, customer: 'Sarah Wilson', amount: 67.25, status: 'completed', date: '2024-01-14' },
  { id: 5, customer: 'David Brown', amount: 189.99, status: 'pending', date: '2024-01-13' }
]

const quickActions = [
  { title: 'New Order', description: 'Create a new customer order', icon: ShoppingCart, color: 'bg-blue-500' },
  { title: 'Add Customer', description: 'Register a new customer', icon: Users, color: 'bg-green-500' },
  { title: 'View Reports', description: 'Access detailed analytics', icon: TrendingUp, color: 'bg-purple-500' },
  { title: 'Inventory Check', description: 'Review stock levels', icon: Eye, color: 'bg-orange-500' }
]

const timeRangeOptions: DropdownOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' }
]

const statusFilterOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'cancelled', label: 'Cancelled' }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Dropdown
            options={timeRangeOptions}
            value={selectedTimeRange}
            onChange={handleTimeRangeChange}
            placeholder="Select time range"
            className="w-40"
          />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$45,231</p>
                <p className="text-xs text-green-600">+20.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">2,350</p>
                <p className="text-xs text-green-600">+180.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-green-600">+19% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Order</p>
                <p className="text-2xl font-bold text-gray-900">$36.65</p>
                <p className="text-xs text-green-600">+4.3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <span>Revenue Overview</span>
            </CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart placeholder</p>
                <p className="text-sm text-gray-400">Revenue visualization will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span>Customer Growth</span>
            </CardTitle>
            <CardDescription>New customer acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart placeholder</p>
                <p className="text-sm text-gray-400">Customer growth visualization will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span>Recent Orders</span>
              </CardTitle>
              <CardDescription>Latest customer orders and their status</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Dropdown
                options={statusFilterOptions}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Filter by status"
                className="w-40"
              />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">#{order.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">${order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
