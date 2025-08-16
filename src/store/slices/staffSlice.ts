import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  hireDate: string
  salary: number
  performance: number
  permissions: string[]
}

export interface Department {
  name: string
  count: number
  color: string
}

export interface StaffState {
  members: StaffMember[]
  departments: Department[]
  roles: string[]
  isLoading: boolean
  error: string | null
  selectedMember: StaffMember | null
  selectedDepartment: string | null
  filters: {
    search: string
    department: string
    role: string
    status: string
    salaryRange: [number, number]
    performanceRange: [number, number]
  }
  viewMode: 'grid' | 'list'
  sortBy: {
    field: keyof StaffMember
    direction: 'asc' | 'desc'
  }
}

// Initial state
const initialState: StaffState = {
  members: [],
  departments: [],
  roles: [],
  isLoading: false,
  error: null,
  selectedMember: null,
  selectedDepartment: null,
  filters: {
    search: '',
    department: 'all',
    role: 'all',
    status: 'all',
    salaryRange: [0, 100000],
    performanceRange: [0, 100],
  },
  viewMode: 'grid',
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
}

// Async thunks
export const fetchStaffMembers = createAsyncThunk(
  'staff/fetchMembers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching staff members')
      
      const response = await new Promise<StaffMember[]>((resolve) => {
        setTimeout(() => {
          resolve([
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
            }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch staff members')
    }
  }
)

export const fetchDepartments = createAsyncThunk(
  'staff/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching departments')
      
      const response = await new Promise<Department[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { name: 'Kitchen', count: 12, color: 'bg-red-100 text-red-800' },
            { name: 'Service', count: 18, color: 'bg-blue-100 text-blue-800' },
            { name: 'Management', count: 5, color: 'bg-green-100 text-green-800' },
            { name: 'Bar', count: 8, color: 'bg-purple-100 text-purple-800' },
            { name: 'Hosting', count: 6, color: 'bg-orange-100 text-orange-800' },
            { name: 'Support', count: 4, color: 'bg-gray-100 text-gray-800' }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch departments')
    }
  }
)

// Staff slice
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // Selection management
    setSelectedMember: (state, action: PayloadAction<StaffMember | null>) => {
      state.selectedMember = action.payload
    },
    setSelectedDepartment: (state, action: PayloadAction<string | null>) => {
      state.selectedDepartment = action.payload
    },
    
    // Filter management
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setDepartmentFilter: (state, action: PayloadAction<string>) => {
      state.filters.department = action.payload
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
    },
    setSalaryRangeFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.salaryRange = action.payload
    },
    setPerformanceRangeFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.performanceRange = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        department: 'all',
        role: 'all',
        status: 'all',
        salaryRange: [0, 100000],
        performanceRange: [0, 100],
      }
    },
    
    // View mode management
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },
    
    // Sorting
    setSortBy: (state, action: PayloadAction<{ field: keyof StaffMember; direction: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload
    },
    
    // Local state updates (for optimistic updates)
    addMember: (state, action: PayloadAction<StaffMember>) => {
      state.members.push(action.payload)
    },
    updateMember: (state, action: PayloadAction<StaffMember>) => {
      const index = state.members.findIndex(member => member.id === action.payload.id)
      if (index !== -1) {
        state.members[index] = action.payload
      }
    },
    removeMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(member => member.id !== action.payload)
    },
    
    // Performance management
    updatePerformance: (state, action: PayloadAction<{ id: number; performance: number }>) => {
      const member = state.members.find(member => member.id === action.payload.id)
      if (member) {
        member.performance = action.payload.performance
      }
    },
    
    // Status management
    updateStatus: (state, action: PayloadAction<{ id: number; status: 'active' | 'inactive' | 'suspended' }>) => {
      const member = state.members.find(member => member.id === action.payload.id)
      if (member) {
        member.status = action.payload.status
      }
    },
    
    // Department management
    addDepartment: (state, action: PayloadAction<Department>) => {
      state.departments.push(action.payload)
    },
    updateDepartment: (state, action: PayloadAction<Department>) => {
      const index = state.departments.findIndex(dept => dept.name === action.payload.name)
      if (index !== -1) {
        state.departments[index] = action.payload
      }
    },
    removeDepartment: (state, action: PayloadAction<string>) => {
      state.departments = state.departments.filter(dept => dept.name !== action.payload)
    },
    
    // Roles management
    setRoles: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload
    },
    
    // Reset state
    resetStaff: (state) => {
      state.members = []
      state.departments = []
      state.roles = []
      state.selectedMember = null
      state.selectedDepartment = null
      state.filters = {
        search: '',
        department: 'all',
        role: 'all',
        status: 'all',
        salaryRange: [0, 100000],
        performanceRange: [0, 100],
      }
      state.viewMode = 'grid'
      state.sortBy = {
        field: 'name',
        direction: 'asc',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch staff members
      .addCase(fetchStaffMembers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchStaffMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.members = action.payload
        
        // Extract unique roles from members
        const roles = [...new Set(action.payload.map(member => member.role))]
        state.roles = roles
      })
      .addCase(fetchStaffMembers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch departments
      .addCase(fetchDepartments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.isLoading = false
        state.departments = action.payload
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// Export actions
export const {
  setSelectedMember,
  setSelectedDepartment,
  setSearchFilter,
  setDepartmentFilter,
  setRoleFilter,
  setStatusFilter,
  setSalaryRangeFilter,
  setPerformanceRangeFilter,
  clearFilters,
  setViewMode,
  setSortBy,
  addMember,
  updateMember,
  removeMember,
  updatePerformance,
  updateStatus,
  addDepartment,
  updateDepartment,
  removeDepartment,
  setRoles,
  resetStaff,
} = staffSlice.actions

// Export reducer
export default staffSlice.reducer
