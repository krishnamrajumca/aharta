'use client'

import React from 'react'
import { Users, DollarSign, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StaffStatsProps {
  totalStaff: number
  activeStaff: number
  totalSalary: number
  avgPerformance: number
}

export default function StaffStats({ 
  totalStaff, 
  activeStaff, 
  totalSalary, 
  avgPerformance 
}: StaffStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
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
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-gray-900">{activeStaff}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Salary</p>
              <p className="text-2xl font-bold text-gray-900">${(totalSalary / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Performance</p>
              <p className="text-2xl font-bold text-gray-900">{avgPerformance.toFixed(0)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
