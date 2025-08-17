'use client'

import React from 'react'
import { BarChart3, TrendingUp, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
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
  )
}
