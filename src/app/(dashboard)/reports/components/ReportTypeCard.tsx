'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ReportType {
  id: number
  name: string
  description: string
  icon: LucideIcon
  category: string
}

interface ReportTypeCardProps {
  reportType: ReportType
  onClick?: () => void
}

export default function ReportTypeCard({ reportType, onClick }: ReportTypeCardProps) {
  const Icon = reportType.icon

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{reportType.name}</h3>
            <p className="text-sm text-gray-500">{reportType.description}</p>
            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mt-2">
              {reportType.category}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
