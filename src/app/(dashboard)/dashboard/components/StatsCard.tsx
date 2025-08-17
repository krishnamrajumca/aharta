'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  iconColor: string
  iconBgColor: string
}

export default function StatsCard({ icon: Icon, title, value, change, iconColor, iconBgColor }: StatsCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-green-600">{change}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
