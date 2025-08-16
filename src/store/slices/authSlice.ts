import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'manager' | 'staff'
  permissions: string[]
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Logging in with:', credentials)
      
      // Mock response - replace with actual API call
      const response = await new Promise<User>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            email: credentials.email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
            permissions: ['all'],
            avatar: '/api/placeholder/100/100'
          })
        }, 1000)
      })

      const token = 'mock-jwt-token-' + Date.now()
      
      return { user: response, token }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call for logout
      console.log('Logging out user')
      
      // Mock API call - replace with actual logout endpoint
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return true
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed')
    }
  }
)

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token
      
      if (!token) {
        throw new Error('No token available')
      }

      // Simulate API call to refresh user data
      console.log('Refreshing user data')
      
      const response = await new Promise<User>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            email: 'john.doe@aharta.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
            permissions: ['all'],
            avatar: '/api/placeholder/100/100'
          })
        }, 500)
      })

      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to refresh user')
    }
  }
)

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Refresh user
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        // Optionally clear auth on refresh failure
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

// Export actions
export const { clearError, setUser, setToken, updateUser, clearAuth } = authSlice.actions

// Export reducer
export default authSlice.reducer
