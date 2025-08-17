'use client'

import React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface DashboardHeaderProps {
  selectedTimeRange: string
  onTimeRangeChange: (value: string | string[]) => void
}

const timeRangeOptions: DropdownOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' }
]

export default function DashboardHeader({ selectedTimeRange, onTimeRangeChange }: DashboardHeaderProps) {
  return (
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
          onChange={onTimeRangeChange}
          placeholder="Select time range"
          className="w-40"
        />
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  )
}
