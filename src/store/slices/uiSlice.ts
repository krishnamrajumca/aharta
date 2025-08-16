import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  timestamp: number
}

export interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarCollapsed: boolean
  sidebarWidth: number
  notifications: Notification[]
  modals: {
    [key: string]: boolean
  }
  loadingStates: {
    [key: string]: boolean
  }
  filters: {
    [key: string]: any
  }
  viewModes: {
    [key: string]: 'grid' | 'list' | 'table'
  }
}

// Initial state
const initialState: UIState = {
  theme: 'system',
  sidebarCollapsed: false,
  sidebarWidth: 280,
  notifications: [],
  modals: {},
  loadingStates: {},
  filters: {},
  viewModes: {
    menu: 'grid',
    inventory: 'table',
    staff: 'grid',
    reports: 'table'
  },
}

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme management
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    
    // Sidebar management
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload
    },
    
    // Notification management
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
      
      // Auto-remove notification after duration (default: 5 seconds)
      const duration = action.payload.duration || 5000
      setTimeout(() => {
        // Note: In a real app, you'd dispatch removeNotification action
        // This is just for demonstration
        console.log('Auto-removing notification:', notification.id)
      }, duration)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // Modal management
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state) => {
      state.modals = {}
    },
    
    // Loading state management
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      state.loadingStates[action.payload.key] = action.payload.loading
    },
    clearLoading: (state, action: PayloadAction<string>) => {
      delete state.loadingStates[action.payload]
    },
    
    // Filter management
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.filters[action.payload.key] = action.payload.value
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload]
    },
    clearAllFilters: (state) => {
      state.filters = {}
    },
    
    // View mode management
    setViewMode: (state, action: PayloadAction<{ key: string; mode: 'grid' | 'list' | 'table' }>) => {
      state.viewModes[action.payload.key] = action.payload.mode
    },
    
    // Reset UI state
    resetUI: (state) => {
      state.theme = 'system'
      state.sidebarCollapsed = false
      state.sidebarWidth = 280
      state.notifications = []
      state.modals = {}
      state.loadingStates = {}
      state.filters = {}
      state.viewModes = {
        menu: 'grid',
        inventory: 'table',
        staff: 'grid',
        reports: 'table'
      }
    },
  },
})

// Export actions
export const {
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  setSidebarWidth,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoading,
  clearLoading,
  setFilter,
  clearFilter,
  clearAllFilters,
  setViewMode,
  resetUI,
} = uiSlice.actions

// Export reducer
export default uiSlice.reducer
