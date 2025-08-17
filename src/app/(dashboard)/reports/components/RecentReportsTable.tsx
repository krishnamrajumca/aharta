'use client'

import React from 'react'
import { FileText, Filter, Download, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface Report {
  id: number
  name: string
  type: string
  generated: string
  status: 'completed' | 'processing' | 'failed'
  size: string
}

interface RecentReportsTableProps {
  reports: Report[]
  selectedReportType: string
  selectedStatus: string
  onReportTypeChange: (value: string | string[]) => void
  onStatusChange: (value: string | string[]) => void
}

const reportTypeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Report Types' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Inventory', label: 'Inventory' },
  { value: 'Customers', label: 'Customers' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'HR' },
  { value: 'Marketing', label: 'Marketing' }
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' }
]

export default function RecentReportsTable({ 
  reports, 
  selectedReportType, 
  selectedStatus, 
  onReportTypeChange, 
  onStatusChange 
}: RecentReportsTableProps) {
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    )
  }

  return (
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
              onChange={onReportTypeChange}
              placeholder="Filter by type"
              className="w-40"
            />
            <Dropdown
              options={statusOptions}
              value={selectedStatus}
              onChange={onStatusChange}
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
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{report.generated}</td>
                  <td className="py-3 px-4">
                    {getStatusBadge(report.status)}
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
  )
}
