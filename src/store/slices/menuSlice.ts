import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface MenuCategory {
  id: number
  name: string
  count: number
  color: string
  position: number
}

export interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  price: number
  cost: number
  image: string
  status: 'active' | 'inactive'
  preparationTime: string
  allergens: string[]
  tags: string[]
  stock: number
  position: number
}

export interface MenuAddon {
  id: number
  name: string
  price: number
  category: string
  status: 'active' | 'inactive'
  position: number
  description: string
}

export interface MenuState {
  categories: MenuCategory[]
  items: MenuItem[]
  addons: MenuAddon[]
  isLoading: boolean
  error: string | null
  selectedCategory: string | null
  selectedItem: MenuItem | null
  selectedAddon: MenuAddon | null
  filters: {
    search: string
    category: string
    status: string
    priceRange: [number, number]
  }
  viewMode: 'grid' | 'list'
}

// Initial state
const initialState: MenuState = {
  categories: [],
  items: [],
  addons: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  selectedItem: null,
  selectedAddon: null,
  filters: {
    search: '',
    category: 'all',
    status: 'all',
    priceRange: [0, 1000],
  },
  viewMode: 'grid',
}

// Async thunks
export const fetchMenuCategories = createAsyncThunk(
  'menu/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching menu categories')
      
      const response = await new Promise<MenuCategory[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Appetizers', count: 12, color: 'bg-blue-100 text-blue-800', position: 1 },
            { id: 2, name: 'Main Courses', count: 24, color: 'bg-green-100 text-green-800', position: 2 },
            { id: 3, name: 'Desserts', count: 8, color: 'bg-purple-100 text-purple-800', position: 3 },
            { id: 4, name: 'Beverages', count: 15, color: 'bg-orange-100 text-orange-800', position: 4 },
            { id: 5, name: 'Sides', count: 18, color: 'bg-red-100 text-red-800', position: 5 },
            { id: 6, name: 'Specials', count: 6, color: 'bg-yellow-100 text-yellow-800', position: 6 }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories')
    }
  }
)

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching menu items')
      
      const response = await new Promise<MenuItem[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: 'Grilled Salmon',
              description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
              category: 'Main Courses',
              price: 28.99,
              cost: 12.50,
              image: '/api/placeholder/300/200',
              status: 'active',
              preparationTime: '25 min',
              allergens: ['Fish', 'Dairy'],
              tags: ['Popular', 'Chef Special'],
              stock: 45,
              position: 1
            },
            {
              id: 2,
              name: 'Caesar Salad',
              description: 'Crisp romaine lettuce, parmesan cheese, croutons with caesar dressing',
              category: 'Appetizers',
              price: 14.99,
              cost: 6.20,
              image: '/api/placeholder/300/200',
              status: 'active',
              preparationTime: '10 min',
              allergens: ['Dairy', 'Gluten'],
              tags: ['Vegetarian', 'Healthy'],
              stock: 32,
              position: 2
            }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch menu items')
    }
  }
)

export const fetchMenuAddons = createAsyncThunk(
  'menu/fetchAddons',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Fetching menu addons')
      
      const response = await new Promise<MenuAddon[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: 'Extra Cheese',
              price: 2.99,
              category: 'Toppings',
              status: 'active',
              position: 1,
              description: 'Additional cheese for your dish'
            },
            {
              id: 2,
              name: 'Bacon Bits',
              price: 3.99,
              category: 'Toppings',
              status: 'active',
              position: 2,
              description: 'Crispy bacon bits to enhance flavor'
            }
          ])
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch addons')
    }
  }
)

// Menu slice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Selection management
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload
    },
    setSelectedAddon: (state, action: PayloadAction<MenuAddon | null>) => {
      state.selectedAddon = action.payload
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
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        status: 'all',
        priceRange: [0, 1000],
      }
    },
    
    // View mode management
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },
    
    // Local state updates (for optimistic updates)
    addCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action: PayloadAction<MenuCategory>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id)
      if (index !== -1) {
        state.categories[index] = action.payload
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload)
    },
    
    addItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    
    addAddon: (state, action: PayloadAction<MenuAddon>) => {
      state.addons.push(action.payload)
    },
    updateAddon: (state, action: PayloadAction<MenuAddon>) => {
      const index = state.addons.findIndex(addon => addon.id === action.payload.id)
      if (index !== -1) {
        state.addons[index] = action.payload
      }
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter(addon => addon.id !== action.payload)
    },
    
    // Reorder items
    reorderCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.categories = action.payload
    },
    reorderItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload
    },
    reorderAddons: (state, action: PayloadAction<MenuAddon[]>) => {
      state.addons = action.payload
    },
    
    // Reset state
    resetMenu: (state) => {
      state.categories = []
      state.items = []
      state.addons = []
      state.selectedCategory = null
      state.selectedItem = null
      state.selectedAddon = null
      state.filters = {
        search: '',
        category: 'all',
        status: 'all',
        priceRange: [0, 1000],
      }
      state.viewMode = 'grid'
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchMenuCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch items
      .addCase(fetchMenuItems.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch addons
      .addCase(fetchMenuAddons.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMenuAddons.fulfilled, (state, action) => {
        state.isLoading = false
        state.addons = action.payload
      })
      .addCase(fetchMenuAddons.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// Export actions
export const {
  setSelectedCategory,
  setSelectedItem,
  setSelectedAddon,
  setSearchFilter,
  setCategoryFilter,
  setStatusFilter,
  setPriceRangeFilter,
  clearFilters,
  setViewMode,
  addCategory,
  updateCategory,
  removeCategory,
  addItem,
  updateItem,
  removeItem,
  addAddon,
  updateAddon,
  removeAddon,
  reorderCategories,
  reorderItems,
  reorderAddons,
  resetMenu,
} = menuSlice.actions

// Export reducer
export default menuSlice.reducer
