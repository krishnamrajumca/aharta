import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface InventoryItem {
  id: number
  name: string
  category: string
  sku: string
  quantity: number
  unit: string
  price: number
  cost: number
  supplier: string
  status: 'in-stock' | 'low-stock' | 'critical' | 'out-of-stock'
  reorderPoint: number
  lastUpdated: string
}

export interface Supplier {
  id: number
  name: string
  contact: string
  phone: string
  email: string
}

export interface InventoryState {
  items: InventoryItem[]
  suppliers: Supplier[]
  categories: string[]
  isLoading: boolean
  error: string | null
  selectedItem: InventoryItem | null
  selectedSupplier: Supplier | null
  filters: {
    search: string
    category: string
    status: string
    priceRange: [number, number]
    stockRange: [number, number]
  }
  viewMode: 'table' | 'cards'
  sortBy: {
    field: keyof InventoryItem
    direction: 'asc' | 'desc'
  }
}

// Initial state
const initialState: InventoryState = {
  items: [],
  suppliers: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedItem: null,
  selectedSupplier: null,
  filters: {
    search: '',
    category: 'all',
    status: 'all',
    priceRange: [0, 1000],
    stockRange: [0, 1000],
  },
  viewMode: 'table',
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
}

// Async thunks
export const fetchInventoryItems = createAsyncThunk(
  'inventory/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching inventory items')
      
      const response = await new Promise<InventoryItem[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: 'Premium Coffee Beans',
              category: 'Beverages',
              sku: 'COF-001',
              quantity: 150,
              unit: 'kg',
              price: 25.99,
              cost: 18.50,
              supplier: 'Coffee Co.',
              status: 'in-stock',
              reorderPoint: 50,
              lastUpdated: '2024-01-15'
            },
            {
              id: 2,
              name: 'Organic Milk',
              category: 'Dairy',
              sku: 'DAI-001',
              quantity: 45,
              unit: 'L',
              price: 4.99,
              cost: 3.20,
              supplier: 'Dairy Farm',
              status: 'low-stock',
              reorderPoint: 60,
              lastUpdated: '2024-01-15'
            },
            {
              id: 3,
              name: 'Fresh Eggs',
              category: 'Dairy',
              sku: 'DAI-002',
              quantity: 200,
              unit: 'dozen',
              price: 6.99,
              cost: 4.80,
              supplier: 'Egg Farm',
              status: 'in-stock',
              reorderPoint: 100,
              lastUpdated: '2024-01-14'
            }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch inventory items')
    }
  }
)

export const fetchSuppliers = createAsyncThunk(
  'inventory/fetchSuppliers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching suppliers')
      
      const response = await new Promise<Supplier[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Coffee Co.', contact: 'John Smith', phone: '+1-555-0101', email: 'john@coffee.com' },
            { id: 2, name: 'Dairy Farm', contact: 'Sarah Johnson', phone: '+1-555-0102', email: 'sarah@dairy.com' },
            { id: 3, name: 'Egg Farm', contact: 'Mike Wilson', phone: '+1-555-0103', email: 'mike@egg.com' }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch suppliers')
    }
  }
)

// Inventory slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Selection management
    setSelectedItem: (state, action: PayloadAction<InventoryItem | null>) => {
      state.selectedItem = action.payload
    },
    setSelectedSupplier: (state, action: PayloadAction<Supplier | null>) => {
      state.selectedSupplier = action.payload
    },
    
    // Filter management
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
    },
    setPriceRangeFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload
    },
    setStockRangeFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.stockRange = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        status: 'all',
        priceRange: [0, 1000],
        stockRange: [0, 1000],
      }
    },
    
    // View mode management
    setViewMode: (state, action: PayloadAction<'table' | 'cards'>) => {
      state.viewMode = action.payload
    },
    
    // Sorting
    setSortBy: (state, action: PayloadAction<{ field: keyof InventoryItem; direction: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload
    },
    
    // Local state updates (for optimistic updates)
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    
    // Stock management
    updateStock: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        item.lastUpdated = new Date().toISOString().split('T')[0]
        
        // Update status based on quantity and reorder point
        if (item.quantity <= 0) {
          item.status = 'out-of-stock'
        } else if (item.quantity <= item.reorderPoint * 0.3) {
          item.status = 'critical'
        } else if (item.quantity <= item.reorderPoint) {
          item.status = 'low-stock'
        } else {
          item.status = 'in-stock'
        }
      }
    },
    
    // Supplier management
    addSupplier: (state, action: PayloadAction<Supplier>) => {
      state.suppliers.push(action.payload)
    },
    updateSupplier: (state, action: PayloadAction<Supplier>) => {
      const index = state.suppliers.findIndex(supplier => supplier.id === action.payload.id)
      if (index !== -1) {
        state.suppliers[index] = action.payload
      }
    },
    removeSupplier: (state, action: PayloadAction<number>) => {
      state.suppliers = state.suppliers.filter(supplier => supplier.id !== action.payload)
    },
    
    // Categories management
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    
    // Reset state
    resetInventory: (state) => {
      state.items = []
      state.suppliers = []
      state.categories = []
      state.selectedItem = null
      state.selectedSupplier = null
      state.filters = {
        search: '',
        category: 'all',
        status: 'all',
        priceRange: [0, 1000],
        stockRange: [0, 1000],
      }
      state.viewMode = 'table'
      state.sortBy = {
        field: 'name',
        direction: 'asc',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inventory items
      .addCase(fetchInventoryItems.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        
        // Extract unique categories from items
        const categories = [...new Set(action.payload.map(item => item.category))]
        state.categories = categories
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch suppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.isLoading = false
        state.suppliers = action.payload
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// Export actions
export const {
  setSelectedItem,
  setSelectedSupplier,
  setSearchFilter,
  setCategoryFilter,
  setStatusFilter,
  setPriceRangeFilter,
  setStockRangeFilter,
  clearFilters,
  setViewMode,
  setSortBy,
  addItem,
  updateItem,
  removeItem,
  updateStock,
  addSupplier,
  updateSupplier,
  removeSupplier,
  setCategories,
  resetInventory,
} = inventorySlice.actions

// Export reducer
export default inventorySlice.reducer
