'use client'

import React, { useState } from 'react'
import { BarChart3, TrendingUp, Download, FileText, PieChart, LineChart } from 'lucide-react'

// Import components
import ReportsHeader from './components/ReportsHeader'
import ReportTypesSection from './components/ReportTypesSection'
import RecentReportsTable from './components/RecentReportsTable'
import QuickActions from './components/QuickActions'

// Mock data for reports
const reportTypes = [
  { id: 1, name: 'Sales Report', description: 'Revenue and sales performance', icon: TrendingUp, category: 'Sales' },
  { id: 2, name: 'Inventory Report', description: 'Stock levels and movement', icon: BarChart3, category: 'Inventory' },
  { id: 3, name: 'Customer Report', description: 'Customer behavior and demographics', icon: FileText, category: 'Customers' },
  { id: 4, name: 'Financial Report', description: 'Profit, loss, and cash flow', icon: PieChart, category: 'Finance' },
  { id: 5, name: 'Staff Report', description: 'Employee performance metrics', icon: FileText, category: 'HR' },
  { id: 6, name: 'Marketing Report', description: 'Campaign performance and ROI', icon: LineChart, category: 'Marketing' }
]

const recentReports = [
  { id: 1, name: 'Monthly Sales Summary', type: 'Sales Report', generated: '2024-01-15', status: 'completed' as const, size: '2.3 MB' },
  { id: 2, name: 'Q4 Financial Review', type: 'Financial Report', generated: '2024-01-14', status: 'completed' as const, size: '4.1 MB' },
  { id: 3, name: 'Customer Retention Analysis', type: 'Customer Report', generated: '2024-01-13', status: 'completed' as const, size: '1.8 MB' },
  { id: 4, name: 'Inventory Turnover Report', type: 'Inventory Report', generated: '2024-01-12', status: 'processing' as const, size: '3.2 MB' },
  { id: 5, name: 'Staff Performance Q4', type: 'Staff Report', generated: '2024-01-11', status: 'completed' as const, size: '2.7 MB' }
]

const quickActions = [
  { title: 'Schedule Report', description: 'Set up automated report generation', icon: BarChart3, color: 'bg-blue-100' },
  { title: 'Custom Analytics', description: 'Create custom dashboard widgets', icon: TrendingUp, color: 'bg-green-100' },
  { title: 'Export Data', description: 'Export data in various formats', icon: Download, color: 'bg-purple-100' }
]

export default function ReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('month')
  const [selectedReportType, setSelectedReportType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const handleTimeRangeChange = (value: string | string[]) => {
    setSelectedTimeRange(Array.isArray(value) ? value[0] : value)
  }

  const handleReportTypeChange = (value: string | string[]) => {
    setSelectedReportType(Array.isArray(value) ? value[0] : value)
  }

  const handleStatusChange = (value: string | string[]) => {
    setSelectedStatus(Array.isArray(value) ? value[0] : value)
  }

  const filteredReports = recentReports.filter(report => {
    const matchesType = selectedReportType === 'all' || report.type.includes(selectedReportType)
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    return matchesType && matchesStatus
  })

  const handleReportTypeClick = (reportType: any) => {
    console.log('Report type clicked:', reportType)
    // Handle report type selection
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <ReportsHeader 
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      {/* Report Types */}
      <ReportTypesSection
        reportTypes={reportTypes}
        onReportTypeClick={handleReportTypeClick}
      />

      {/* Filters and Recent Reports */}
      <RecentReportsTable
        reports={filteredReports}
        selectedReportType={selectedReportType}
        selectedStatus={selectedStatus}
        onReportTypeChange={handleReportTypeChange}
        onStatusChange={handleStatusChange}
      />

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />
    </div>
  )
}
