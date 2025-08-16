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
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for staff members and departments/roles
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
    permissions: ['menu_edit', 'inventory_view', 'reports_view']
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
    permissions: ['orders_view', 'customer_edit']
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
    permissions: ['all']
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
    permissions: ['menu_edit', 'inventory_view']
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
    permissions: ['reservations_view', 'customer_view']
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
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAddStaff, setShowAddStaff] = useState(false)

  const filteredStaff = staffMembers.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesRole = selectedRole === 'all' || member.role === selectedRole
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesRole && matchesSearch
  })

  const activeStaff = staffMembers.filter(member => member.status === 'active')
  const totalSalary = staffMembers.reduce((sum, member) => sum + member.salary, 0)
  const avgPerformance = staffMembers.reduce((sum, member) => sum + member.performance, 0) / staffMembers.length

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

  const handleAddStaff = () => {
    console.log('Adding new staff member')
    setShowAddStaff(true)
  }

  const handleEditStaff = (staffId: number) => {
    console.log('Editing staff member:', staffId)
  }

  const handleDeleteStaff = (staffId: number) => {
    console.log('Deleting staff member:', staffId)
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

  const handleViewModeChange = (value: string | string[]) => {
    setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : value as 'grid' | 'list')
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
        <Button onClick={handleAddStaff} className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

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

      {/* Filters and Search */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
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
              <Dropdown
                options={viewModeOptions}
                value={viewMode}
                onChange={handleViewModeChange}
                placeholder="Select view mode"
                className="w-32"
              />
            </div>
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
          <p className="text-sm text-gray-500">{filteredStaff.length} members found</p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{member.department}</span>
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
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
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

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Staff Member
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddStaff(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="Enter email" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <Dropdown
                    options={departments.map(dept => ({ value: dept.name, label: dept.name }))}
                    value=""
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
                    value=""
                    onChange={(value) => console.log('Role changed:', value)}
                    placeholder="Select role"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <Input type="number" placeholder="Enter salary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value="active"
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddStaff(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  Add Staff Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
