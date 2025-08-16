'use client'

import React from 'react'
import { Package, Users, ChefHat, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Stocks</h3>
              <p className="text-gray-600 mb-4">Track inventory levels, set reorder points, and manage stock alerts.</p>
              <Button variant="outline" className="w-full">View Stocks</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Vendors</h3>
              <p className="text-gray-600 mb-4">Track supplier performance, manage relationships, and monitor costs.</p>
              <Button variant="outline" className="w-full">View Vendors</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="text-center">
              <ChefHat className="h-12 w-12 mx-auto mb-3 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Recipes</h3>
              <p className="text-gray-600 mb-4">Create and manage recipes with ingredient lists, costs, and instructions.</p>
              <Button variant="outline" className="w-full">View Recipes</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                <p className="text-xs text-gray-600">Organic Milk is running low (45L remaining)</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Package className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New Stock Added</p>
                <p className="text-xs text-gray-600">Premium Coffee Beans restocked (150kg)</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New Vendor Added</p>
                <p className="text-xs text-gray-600">Fresh Produce Co. added to vendor list</p>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
