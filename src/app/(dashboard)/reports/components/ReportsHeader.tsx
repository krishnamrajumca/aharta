'use client'

import React from 'react'
import { BarChart3, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface ReportsHeaderProps {
  selectedTimeRange: string
  onTimeRangeChange: (value: string | string[]) => void
}

const timeRangeOptions: DropdownOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' }
]

export default function ReportsHeader({ selectedTimeRange, onTimeRangeChange }: ReportsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-2">Generate and manage business reports and analytics</p>
      </div>
      <div className="flex items-center space-x-3">
        <Dropdown
          options={timeRangeOptions}
          value={selectedTimeRange}
          onChange={onTimeRangeChange}
          placeholder="Select time range"
          className="w-40"
        />
        <Button className="bg-green-600 hover:bg-green-700">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}
