'use client'

import React, { useState } from 'react'

// Import components
import StaffHeader from './components/StaffHeader'
import StaffStats from './components/StaffStats'
import StaffFilters from './components/StaffFilters'
import StaffGrid from './components/StaffGrid'
import StaffModal from './components/StaffModal'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'

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
    department: 'Bar',
    role: 'Bartender',
    status: 'active',
    hireDate: '2023-06-15',
    salary: 38000,
    performance: 85,
    permissions: ['bar_orders', 'inventory_view'],
    address: '321 Elm St, Borough, State 45678',
    emergencyContact: 'Tom Davis',
    emergencyPhone: '+1-555-0105',
    skills: ['Mixology', 'Customer Service', 'Inventory Management'],
    certifications: ['TIPS Alcohol Service', 'Bartending License'],
    notes: 'Creative with cocktails, good with regular customers'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@aharta.com',
    phone: '+1-555-0105',
    department: 'Host',
    role: 'Host',
    status: 'inactive',
    hireDate: '2023-02-28',
    salary: 32000,
    performance: 78,
    permissions: ['reservations_view', 'customer_view'],
    address: '654 Maple Dr, District, State 56789',
    emergencyContact: 'Anna Brown',
    emergencyPhone: '+1-555-0106',
    skills: ['Customer Service', 'Organization', 'Communication'],
    certifications: ['Customer Service Training'],
    notes: 'Good with reservations, needs work on customer interaction'
  }
]

export default function MembersPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPerformance, setSelectedPerformance] = useState('all')
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('all')
  const [selectedHireDateRange, setSelectedHireDateRange] = useState('all')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [selectedStaff, setSelectedStaff] = useState<Set<number>>(new Set())
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null)

  // Filtered staff based on search and filters
  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesRole = selectedRole === 'all' || member.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  // Calculate stats
  const activeStaff = staffMembers.filter(member => member.status === 'active')
  const totalSalary = staffMembers.reduce((sum, member) => sum + member.salary, 0)
  const avgPerformance = staffMembers.reduce((sum, member) => sum + member.performance, 0) / staffMembers.length

  // Event handlers
  const handleAddStaff = () => {
    setShowAddStaff(true)
    setEditingMember(null)
  }

  const handleEditStaff = (memberId: number) => {
    const member = staffMembers.find(m => m.id === memberId)
    setEditingMember(member)
    setShowAddStaff(true)
  }

  const handleContactStaff = (memberId: number) => {
    console.log('Contacting staff member:', memberId)
  }

  const handleDeleteStaff = (memberId: number) => {
    setDeletingMemberId(memberId)
    setShowDeleteConfirm(true)
  }

  const handleExport = () => {
    console.log('Exporting staff data')
  }

  const handleImport = () => {
    console.log('Importing staff data')
  }

  const handleModalClose = () => {
    setShowAddStaff(false)
    setEditingMember(null)
  }

  const handleModalSubmit = () => {
    console.log('Submitting staff form')
    handleModalClose()
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedDepartment('all')
    setSelectedRole('all')
    setSelectedStatus('all')
    setSelectedPerformance('all')
    setSelectedSalaryRange('all')
    setSelectedHireDateRange('all')
  }

  const handleConfirmDelete = () => {
    if (deletingMemberId) {
      console.log('Deleting staff member:', deletingMemberId)
      // In a real application, you would remove the member from the staffMembers array
      // and update the UI. For this example, we'll just close the modal.
      setShowDeleteConfirm(false)
      setDeletingMemberId(null)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingMemberId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <StaffHeader 
        onAddStaff={handleAddStaff}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Stats Cards */}
      <StaffStats
        totalStaff={staffMembers.length}
        activeStaff={activeStaff.length}
        totalSalary={totalSalary}
        avgPerformance={avgPerformance}
      />

      {/* Filters */}
      <StaffFilters
        searchQuery={searchQuery}
        selectedDepartment={selectedDepartment}
        selectedRole={selectedRole}
        selectedStatus={selectedStatus}
        selectedPerformance={selectedPerformance}
        selectedSalaryRange={selectedSalaryRange}
        selectedHireDateRange={selectedHireDateRange}
        showAdvancedFilters={showAdvancedFilters}
        onSearchChange={setSearchQuery}
        onDepartmentChange={(value) => setSelectedDepartment(Array.isArray(value) ? value[0] : value)}
        onRoleChange={(value) => setSelectedRole(Array.isArray(value) ? value[0] : value)}
        onStatusChange={(value) => setSelectedStatus(Array.isArray(value) ? value[0] : value)}
        onPerformanceChange={(value) => setSelectedPerformance(Array.isArray(value) ? value[0] : value)}
        onSalaryRangeChange={(value) => setSelectedSalaryRange(Array.isArray(value) ? value[0] : value)}
        onHireDateRangeChange={(value) => setSelectedHireDateRange(Array.isArray(value) ? value[0] : value)}
        onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
        onClearFilters={handleClearFilters}
      />

      {/* Staff Grid/List */}
      {viewMode === 'grid' && (
        <StaffGrid
          staff={filteredStaff}
          onEdit={handleEditStaff}
          onContact={handleContactStaff}
          onDelete={handleDeleteStaff}
        />
      )}

      {/* Add/Edit Staff Modal */}
      <StaffModal
        isOpen={showAddStaff}
        editingMember={editingMember}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        type="staff"
        itemName={staffMembers.find(member => member.id === deletingMemberId)?.name || ''}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
