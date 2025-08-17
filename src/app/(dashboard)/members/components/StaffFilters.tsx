'use client'

import React from 'react'
import { Search, Filter, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'
import { Card, CardContent } from '@/components/ui/card'

interface StaffFiltersProps {
  searchQuery: string
  selectedDepartment: string
  selectedRole: string
  selectedStatus: string
  selectedPerformance: string
  selectedSalaryRange: string
  selectedHireDateRange: string
  showAdvancedFilters: boolean
  onSearchChange: (query: string) => void
  onDepartmentChange: (value: string | string[]) => void
  onRoleChange: (value: string | string[]) => void
  onStatusChange: (value: string | string[]) => void
  onPerformanceChange: (value: string | string[]) => void
  onSalaryRangeChange: (value: string | string[]) => void
  onHireDateRangeChange: (value: string | string[]) => void
  onToggleAdvancedFilters: () => void
  onClearFilters: () => void
}

const departmentOptions: DropdownOption[] = [
  { value: 'all', label: 'All Departments' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Service', label: 'Service' },
  { value: 'Management', label: 'Management' },
  { value: 'Bar', label: 'Bar' },
  { value: 'Host', label: 'Host' },
  { value: 'Maintenance', label: 'Maintenance' }
]

const roleOptions: DropdownOption[] = [
  { value: 'all', label: 'All Roles' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Server', label: 'Server' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Bartender', label: 'Bartender' },
  { value: 'Host', label: 'Host' },
  { value: 'Maintenance', label: 'Maintenance' }
]

const statusOptions: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
  { value: 'terminated', label: 'Terminated' }
]

const performanceOptions: DropdownOption[] = [
  { value: 'all', label: 'All Performance Levels' },
  { value: 'excellent', label: 'Excellent (90-100%)' },
  { value: 'good', label: 'Good (80-89%)' },
  { value: 'average', label: 'Average (70-79%)' },
  { value: 'below_average', label: 'Below Average (<70%)' }
]

const salaryRangeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Salary Ranges' },
  { value: 'low', label: 'Low ($20k-$40k)' },
  { value: 'medium', label: 'Medium ($40k-$60k)' },
  { value: 'high', label: 'High ($60k-$80k)' },
  { value: 'executive', label: 'Executive ($80k+)' }
]

const hireDateRangeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Hire Dates' },
  { value: 'recent', label: 'Recent (Last 6 months)' },
  { value: 'year', label: 'This Year' },
  { value: 'two_years', label: 'Last 2 Years' },
  { value: 'five_years', label: 'Last 5 Years' },
  { value: 'veteran', label: 'Veteran (5+ years)' }
]

export default function StaffFilters({ 
  searchQuery, 
  selectedDepartment, 
  selectedRole, 
  selectedStatus, 
  selectedPerformance, 
  selectedSalaryRange, 
  selectedHireDateRange, 
  showAdvancedFilters, 
  onSearchChange, 
  onDepartmentChange, 
  onRoleChange, 
  onStatusChange, 
  onPerformanceChange, 
  onSalaryRangeChange, 
  onHireDateRangeChange, 
  onToggleAdvancedFilters, 
  onClearFilters 
}: StaffFiltersProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Basic Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search staff members..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dropdown
                options={departmentOptions}
                value={selectedDepartment}
                onChange={onDepartmentChange}
                placeholder="Select department"
                className="min-w-[200px]"
              />

              <Dropdown
                options={roleOptions}
                value={selectedRole}
                onChange={onRoleChange}
                placeholder="Select role"
                className="min-w-[200px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleAdvancedFilters}
                className="flex items-center space-x-2"
              >
                {showAdvancedFilters ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <Dropdown
                options={statusOptions}
                value={selectedStatus}
                onChange={onStatusChange}
                placeholder="Select status"
              />
              
              <Dropdown
                options={performanceOptions}
                value={selectedPerformance}
                onChange={onPerformanceChange}
                placeholder="Select performance"
              />
              
              <Dropdown
                options={salaryRangeOptions}
                value={selectedSalaryRange}
                onChange={onSalaryRangeChange}
                placeholder="Select salary range"
              />
              
              <Dropdown
                options={hireDateRangeOptions}
                value={selectedHireDateRange}
                onChange={onHireDateRangeChange}
                placeholder="Select hire date range"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
