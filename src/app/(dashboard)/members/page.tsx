'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  UserPlus,
  Shield, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  MoreHorizontal,
  Grid3X3,
  List,
  X,
  CheckSquare,
  Square,
  AlertTriangle,
  Download,
  Upload,
  Eye,
  GripVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Enhanced mock data for staff members
const staffMembers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@aharta.com',
    phone: '+1-555-0101',
    department: 'Kitchen',
    role: 'Chef',
    status: 'active',
    hireDate: '2023-01-15',
    salary: 65000,
    performance: 95,
    permissions: ['menu_edit', 'inventory_view', 'reports_view'],
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+1-555-0100',
    skills: ['Cooking', 'Leadership', 'Food Safety'],
    certifications: ['Food Handler', 'ServSafe Manager'],
    notes: 'Excellent team leader, great with new staff training'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@aharta.com',
    phone: '+1-555-0102',
    department: 'Service',
    role: 'Server',
    status: 'active',
    hireDate: '2023-03-20',
    salary: 45000,
    performance: 88,
    permissions: ['orders_view', 'customer_edit'],
    address: '456 Oak Ave, Town, State 23456',
    emergencyContact: 'Mike Johnson',
    emergencyPhone: '+1-555-0103',
    skills: ['Customer Service', 'POS Systems', 'Wine Knowledge'],
    certifications: ['TIPS Alcohol Service'],
    notes: 'Great with customers, needs improvement on upselling'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@aharta.com',
    phone: '+1-555-0103',
    department: 'Management',
    role: 'Manager',
    status: 'active',
    hireDate: '2022-11-10',
    salary: 75000,
    performance: 92,
    permissions: ['all'],
    address: '789 Pine Rd, Village, State 34567',
    emergencyContact: 'Lisa Wilson',
    emergencyPhone: '+1-555-0104',
    skills: ['Leadership', 'Operations', 'Financial Management'],
    certifications: ['Business Management', 'Food Safety'],
    notes: 'Strong leader, excellent at conflict resolution'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@aharta.com',
    phone: '+1-555-0104',
    department: 'Kitchen',
    role: 'Sous Chef',
    status: 'active',
    hireDate: '2023-06-05',
    salary: 55000,
    performance: 90,
    permissions: ['menu_edit', 'inventory_view'],
    address: '321 Elm St, Borough, State 45678',
    emergencyContact: 'Tom Davis',
    emergencyPhone: '+1-555-0105',
    skills: ['Cooking', 'Kitchen Management', 'Recipe Development'],
    certifications: ['Food Handler', 'Culinary Arts'],
    notes: 'Creative chef, great at developing new dishes'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@aharta.com',
    phone: '+1-555-0105',
    department: 'Service',
    role: 'Host',
    status: 'inactive',
    hireDate: '2023-02-28',
    salary: 38000,
    performance: 85,
    permissions: ['reservations_view', 'customer_view'],
    address: '654 Maple Dr, District, State 56789',
    emergencyContact: 'Anna Brown',
    emergencyPhone: '+1-555-0106',
    skills: ['Customer Service', 'Reservation Management', 'Greeting'],
    certifications: ['Customer Service Excellence'],
    notes: 'Good host, left for personal reasons'
  }
]

const departments = [
  { name: 'Kitchen', count: 12, color: 'bg-red-100 text-red-800' },
  { name: 'Service', count: 18, color: 'bg-blue-100 text-blue-800' },
  { name: 'Management', count: 5, color: 'bg-green-100 text-green-800' },
  { name: 'Bar', count: 8, color: 'bg-purple-100 text-purple-800' },
  { name: 'Hosting', count: 6, color: 'bg-orange-100 text-orange-800' },
  { name: 'Support', count: 4, color: 'bg-gray-100 text-gray-800' }
]

const roles = [
  'Chef', 'Sous Chef', 'Line Cook', 'Server', 'Bartender', 'Host', 'Manager', 'Assistant Manager', 'Support Staff'
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const performanceOptions = [
  { value: 'all', label: 'All Performance' },
  { value: '90+', label: '90%+' },
  { value: '80-89', label: '80-89%' },
  { value: '70-79', label: '70-79%' },
  { value: '<70', label: '<70%' }
]

const departmentOptions: DropdownOption[] = [
  { value: 'all', label: 'All Departments' },
  ...departments.map(dept => ({ value: dept.name, label: dept.name }))
]

const roleOptions: DropdownOption[] = [
  { value: 'all', label: 'All Roles' },
  ...roles.map(role => ({ value: role, label: role }))
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function StaffPage() {
  // State management
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPerformance, setSelectedPerformance] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<Set<number>>(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState<{min: string, max: string}>({min: '', max: ''})
  const [hireDateRange, setHireDateRange] = useState<{start: string, end: string}>({start: '', end: ''})

  // Enhanced filtering with advanced options
  const filteredStaff = staffMembers.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesRole = selectedRole === 'all' || member.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery)
    
    // Advanced filters
    const matchesPerformance = selectedPerformance === 'all' || 
      (selectedPerformance === '90+' && member.performance >= 90) ||
      (selectedPerformance === '80-89' && member.performance >= 80 && member.performance < 90) ||
      (selectedPerformance === '70-79' && member.performance >= 70 && member.performance < 80) ||
      (selectedPerformance === '<70' && member.performance < 70)
    
    const matchesSalary = (!salaryRange.min || member.salary >= parseInt(salaryRange.min)) &&
                         (!salaryRange.max || member.salary <= parseInt(salaryRange.max))
    
    const matchesHireDate = (!hireDateRange.start || member.hireDate >= hireDateRange.start) &&
                           (!hireDateRange.end || member.hireDate <= hireDateRange.end)

    return matchesDepartment && matchesRole && matchesStatus && matchesSearch && 
           matchesPerformance && matchesSalary && matchesHireDate
  })

  // Computed values
  const activeStaff = staffMembers.filter(member => member.status === 'active')
  const totalSalary = staffMembers.reduce((sum, member) => sum + member.salary, 0)
  const avgPerformance = staffMembers.reduce((sum, member) => sum + member.performance, 0) / staffMembers.length

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPermissionLevel = (permissions: string[]) => {
    if (permissions.includes('all')) return 'Full Access'
    if (permissions.length >= 5) return 'High Access'
    if (permissions.length >= 3) return 'Medium Access'
    return 'Limited Access'
  }

  // Event handlers
  const handleAddStaff = () => {
    setShowAddStaff(true)
    setEditingStaff(null)
  }

  const handleEditStaff = (staffId: number) => {
    const staff = staffMembers.find(s => s.id === staffId)
    setEditingStaff(staff)
    setShowAddStaff(true)
  }

  const handleDeleteStaff = (staffId: number) => {
    setShowDeleteConfirm(staffId)
  }

  const confirmDeleteStaff = (staffId: number) => {
    console.log('Deleting staff member:', staffId)
    setShowDeleteConfirm(null)
    // In real app, would call API to delete
  }

  const handleContactStaff = (staffId: number) => {
    console.log('Contacting staff member:', staffId)
  }

  const handleDepartmentChange = (value: string | string[]) => {
    setSelectedDepartment(Array.isArray(value) ? value[0] : value)
  }

  const handleRoleChange = (value: string | string[]) => {
    setSelectedRole(Array.isArray(value) ? value[0] : value)
  }

  const handleStatusChange = (value: string | string[]) => {
    setSelectedStatus(Array.isArray(value) ? value[0] : value)
  }

  const handlePerformanceChange = (value: string | string[]) => {
    setSelectedPerformance(Array.isArray(value) ? value[0] : value)
  }

  const handleViewModeChange = (value: string | string[]) => {
    setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')
  }

  // Bulk operations
  const handleSelectAll = () => {
    if (selectedStaff.size === filteredStaff.length) {
      setSelectedStaff(new Set())
    } else {
      setSelectedStaff(new Set(filteredStaff.map(s => s.id)))
    }
  }

  const handleSelectStaff = (staffId: number) => {
    const newSelected = new Set(selectedStaff)
    if (newSelected.has(staffId)) {
      newSelected.delete(staffId)
    } else {
      newSelected.add(staffId)
    }
    setSelectedStaff(newSelected)
  }

  const handleBulkStatusChange = (status: string) => {
    console.log('Bulk status change to:', status, 'for staff:', Array.from(selectedStaff))
    setSelectedStaff(new Set())
    setShowBulkActions(false)
  }

  const handleBulkDelete = () => {
    console.log('Bulk delete staff:', Array.from(selectedStaff))
    setSelectedStaff(new Set())
    setShowBulkActions(false)
  }

  const resetFilters = () => {
    setSelectedDepartment('all')
    setSelectedRole('all')
    setSelectedStatus('all')
    setSelectedPerformance('all')
    setSearchQuery('')
    setSalaryRange({min: '', max: ''})
    setHireDateRange({start: '', end: ''})
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Staff Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your team members and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedStaff.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedStaff.size} selected</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                Bulk Actions
                {showBulkActions ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          )}
          <Button onClick={handleAddStaff} className="bg-green-600 hover:bg-green-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Bulk Actions Dropdown */}
      {showBulkActions && selectedStaff.size > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-800">Bulk Actions for {selectedStaff.size} staff members:</span>
              <div className="flex items-center space-x-2">
                <Dropdown
                  options={[
                    { value: 'active', label: 'Activate' },
                    { value: 'inactive', label: 'Deactivate' },
                    { value: 'suspended', label: 'Suspend' }
                  ]}
                  value=""
                  onChange={(value) => handleBulkStatusChange(Array.isArray(value) ? value[0] : value)}
                  placeholder="Change Status"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{activeStaff.length}</p>
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

      {/* Enhanced Filters and Search */}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Dropdown
                  options={departmentOptions}
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  placeholder="Select department"
                  className="min-w-[200px]"
                />

                <Dropdown
                  options={roleOptions}
                  value={selectedRole}
                  onChange={handleRoleChange}
                  placeholder="Select role"
                  className="min-w-[200px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? 'Hide' : 'Advanced'} Filters
                </Button>
                <Dropdown
                  options={viewModeOptions}
                  value={viewMode}
                  onChange={handleViewModeChange}
                  placeholder="Select view mode"
                  className="w-32"
                />
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Dropdown
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    placeholder="Status"
                  />
                  <Dropdown
                    options={performanceOptions}
                    value={selectedPerformance}
                    onChange={handlePerformanceChange}
                    placeholder="Performance"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Min"
                        value={salaryRange.min}
                        onChange={(e) => setSalaryRange({...salaryRange, min: e.target.value})}
                        className="w-20"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <Input
                        placeholder="Max"
                        value={salaryRange.max}
                        onChange={(e) => setSalaryRange({...salaryRange, max: e.target.value})}
                        className="w-20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={hireDateRange.start}
                        onChange={(e) => setHireDateRange({...hireDateRange, start: e.target.value})}
                        className="w-32"
                      />
                      <span className="text-gray-500 self-center">-</span>
                      <Input
                        type="date"
                        value={hireDateRange.end}
                        onChange={(e) => setHireDateRange({...hireDateRange, end: e.target.value})}
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Departments Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {departments.map((department) => (
            <Card key={department.name} className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${department.color}`}>
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-900">{department.name}</h3>
                <p className="text-sm text-gray-500">{department.count} staff</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Staff Members Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Staff Members</h2>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">{filteredStaff.length} members found</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="flex items-center space-x-2"
              >
                {selectedStaff.size === filteredStaff.length ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span>{selectedStaff.size === filteredStaff.length ? 'Deselect All' : 'Select All'}</span>
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Selection Checkbox */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedStaff.has(member.id)}
                        onChange={() => handleSelectStaff(member.id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStaff(member.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStaff(member.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.role} • {member.department}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Hired: {member.hireDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>${member.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="h-4 w-4" />
                      <span>Performance: {member.performance}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {getPermissionLevel(member.permissions)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStaff(member.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactStaff(member.id)}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedStaff.has(member.id)}
                      onChange={() => handleSelectStaff(member.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {getPermissionLevel(member.permissions)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                        <span>Email: {member.email}</span>
                        <span>Phone: {member.phone}</span>
                        <span>Hired: {member.hireDate}</span>
                        <span>Salary: ${member.salary.toLocaleString()}</span>
                        <span>Performance: {member.performance}%</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStaff(member.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactStaff(member.id)}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddStaff(false)
                    setEditingStaff(null)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    defaultValue={editingStaff?.name || ''} 
                    placeholder="Enter full name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    defaultValue={editingStaff?.email || ''} 
                    placeholder="Enter email" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input 
                    defaultValue={editingStaff?.phone || ''} 
                    placeholder="Enter phone number" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <Dropdown
                    options={departments.map(dept => ({ value: dept.name, label: dept.name }))}
                    value={editingStaff?.department || ''}
                    onChange={(value) => console.log('Department changed:', value)}
                    placeholder="Select department"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <Dropdown
                    options={roles.map(role => ({ value: role, label: role }))}
                    value={editingStaff?.role || ''}
                    onChange={(value) => console.log('Role changed:', value)}
                    placeholder="Select role"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                  <Input 
                    type="date" 
                    defaultValue={editingStaff?.hireDate || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <Input 
                    type="number" 
                    defaultValue={editingStaff?.salary || ''}
                    placeholder="Enter salary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'suspended', label: 'Suspended' }
                    ]}
                    value={editingStaff?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Performance (%)</label>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100"
                    defaultValue={editingStaff?.performance || ''}
                    placeholder="Enter performance" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <Input 
                    defaultValue={editingStaff?.emergencyContact || ''}
                    placeholder="Emergency contact name" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone</label>
                  <Input 
                    defaultValue={editingStaff?.emergencyPhone || ''}
                    placeholder="Emergency contact phone" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <Input 
                    defaultValue={editingStaff?.address || ''}
                    placeholder="Enter address" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <Input 
                  defaultValue={editingStaff?.skills?.join(', ') || ''}
                  placeholder="Enter skills (comma separated)" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                <Input 
                  defaultValue={editingStaff?.certifications?.join(', ') || ''}
                  placeholder="Enter certifications (comma separated)" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter additional notes"
                  defaultValue={editingStaff?.notes || ''}
                />
              </div>

            </CardContent>
            <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddStaff(false)
                    setEditingStaff(null)
                  }}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingStaff ? 'Update Staff Member' : 'Add Staff Member'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this staff member? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => confirmDeleteStaff(showDeleteConfirm)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
