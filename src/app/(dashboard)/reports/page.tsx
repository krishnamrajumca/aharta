'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  FileText,
  PieChart,
  LineChart,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

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
  { id: 1, name: 'Monthly Sales Summary', type: 'Sales Report', generated: '2024-01-15', status: 'completed', size: '2.3 MB' },
  { id: 2, name: 'Q4 Financial Review', type: 'Financial Report', generated: '2024-01-14', status: 'completed', size: '4.1 MB' },
  { id: 3, name: 'Customer Retention Analysis', type: 'Customer Report', generated: '2024-01-13', status: 'completed', size: '1.8 MB' },
  { id: 4, name: 'Inventory Turnover Report', type: 'Inventory Report', generated: '2024-01-12', status: 'processing', size: '3.2 MB' },
  { id: 5, name: 'Staff Performance Q4', type: 'Staff Report', generated: '2024-01-11', status: 'completed', size: '2.7 MB' }
]

const timeRangeOptions: DropdownOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' }
]

const reportTypeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Report Types' },
  ...reportTypes.map(type => ({ value: type.category, label: type.category }))
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
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
            onChange={handleTimeRangeChange}
            placeholder="Select time range"
            className="w-40"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((reportType) => (
            <Card key={reportType.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <reportType.icon className="h-6 w-6 text-blue-600" />
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
          ))}
        </div>
      </div>

      {/* Filters and Recent Reports */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <span>Recent Reports</span>
              </CardTitle>
              <CardDescription>Recently generated and scheduled reports</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Dropdown
                options={reportTypeOptions}
                value={selectedReportType}
                onChange={handleReportTypeChange}
                placeholder="Filter by type"
                className="w-40"
              />
              <Dropdown
                options={statusOptions}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Generated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{report.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{report.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{report.generated}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{report.size}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Schedule Report</h3>
              <p className="text-sm text-gray-500">Set up automated report generation</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Analytics</h3>
              <p className="text-sm text-gray-500">Create custom dashboard widgets</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-500">Export data in various formats</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
