# Redux Toolkit Store with Persistence

This directory contains the Redux Toolkit store implementation with persistence for the Aharta application.

## 🏗️ **Store Structure**

### **Main Store (`index.ts`)**
- **Configuration**: Redux Toolkit store with persistence
- **Middleware**: Serialization checks for Redux Persist
- **DevTools**: Enabled in development mode
- **Persistence**: Only `auth` and `ui` states are persisted

### **Slices**
1. **`authSlice.ts`** - Authentication state management
2. **`uiSlice.ts`** - UI preferences and state
3. **`menuSlice.ts`** - Menu categories, items, and addons
4. **`inventorySlice.ts`** - Inventory items and suppliers
5. **`staffSlice.ts`** - Staff members and departments

## 🔧 **Usage in Components**

### **1. Import Hooks**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
```

### **2. Dispatch Actions**
```typescript
const dispatch = useAppDispatch()

// Example: Login user
const handleLogin = async () => {
  const result = await dispatch(loginUser({ email, password }))
  if (loginUser.fulfilled.match(result)) {
    // Handle success
  }
}
```

### **3. Select State**
```typescript
const { user, isLoading, error } = useAppSelector(state => state.auth)
const { theme, sidebarCollapsed } = useAppSelector(state => state.ui)
```

## 📊 **State Management Features**

### **Authentication (`authSlice`)**
- **User Management**: Login, logout, user refresh
- **Token Handling**: JWT token storage and management
- **Permissions**: User role and permission management
- **Async Operations**: API calls with loading states

### **UI State (`uiSlice`)**
- **Theme Management**: Light/dark/system theme switching
- **Sidebar Control**: Collapse/expand sidebar
- **Notifications**: Toast notifications with auto-removal
- **Modals**: Global modal state management
- **Loading States**: Component-specific loading indicators
- **Filters**: Reusable filter state management
- **View Modes**: Grid/list/table view preferences

### **Menu Management (`menuSlice`)**
- **Categories**: Menu category CRUD operations
- **Items**: Menu item management with drag-and-drop
- **Addons**: Extra items and toppings
- **Filtering**: Search, category, and status filters
- **View Modes**: Grid and list view switching

### **Inventory Management (`inventorySlice`)**
- **Items**: Product inventory with stock tracking
- **Suppliers**: Vendor management
- **Stock Management**: Automatic status updates
- **Categories**: Product categorization
- **Sorting**: Multi-field sorting capabilities

### **Staff Management (`staffSlice`)**
- **Members**: Employee information and management
- **Departments**: Organizational structure
- **Roles**: Job role management
- **Performance**: Employee performance tracking
- **Permissions**: Access control management

## 🚀 **Key Features**

### **1. Persistence**
- **Local Storage**: Auth and UI preferences persist across sessions
- **Selective Persistence**: Only essential data is persisted
- **Automatic Hydration**: State restored on app reload

### **2. Async Operations**
- **Thunks**: API calls with loading and error states
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Comprehensive error management

### **3. Type Safety**
- **TypeScript**: Full type safety for all actions and state
- **Inferred Types**: Automatic type inference from slices
- **Generic Hooks**: Typed `useAppDispatch` and `useAppSelector`

### **4. Performance**
- **Immutability**: Efficient state updates with Immer
- **Selectors**: Optimized state selection
- **Middleware**: Minimal overhead with Redux Toolkit

## 🔄 **State Flow**

### **1. Component → Action → Reducer → Store**
```typescript
// Component dispatches action
dispatch(loginUser({ email, password }))

// Reducer updates state
case loginUser.fulfilled:
  state.isAuthenticated = true
  state.user = action.payload.user

// Component receives updated state
const { isAuthenticated, user } = useAppSelector(state => state.auth)
```

### **2. Persistence Flow**
```typescript
// State changes are automatically persisted
dispatch(setTheme('dark'))

// On app reload, state is restored
const theme = useAppSelector(state => state.ui.theme) // 'dark'
```

## 📝 **Best Practices**

### **1. Action Naming**
- Use descriptive action names: `setUserProfile` not `setUser`
- Group related actions in slices
- Use consistent naming conventions

### **2. State Structure**
- Keep state flat and normalized
- Use selectors for derived state
- Avoid deeply nested objects

### **3. Error Handling**
- Always handle async operation errors
- Provide user-friendly error messages
- Log errors for debugging

### **4. Performance**
- Use selectors to avoid unnecessary re-renders
- Memoize expensive computations
- Avoid dispatching actions in render

## 🧪 **Testing**

### **1. Slice Testing**
```typescript
import { authSlice, loginUser } from './authSlice'

describe('authSlice', () => {
  it('should handle login success', () => {
    const initialState = { isAuthenticated: false, user: null }
    const action = { type: loginUser.fulfilled.type, payload: { user: mockUser } }
    const newState = authSlice.reducer(initialState, action)
    
    expect(newState.isAuthenticated).toBe(true)
    expect(newState.user).toEqual(mockUser)
  })
})
```

### **2. Component Testing**
```typescript
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store'

const TestWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

test('renders login form', () => {
  render(<LoginForm />, { wrapper: TestWrapper })
  expect(screen.getByText('Sign In')).toBeInTheDocument()
})
```

## 🔧 **Configuration**

### **1. Environment Variables**
```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

### **2. Persistence Options**
```typescript
const persistConfig = {
  key: 'aharta-root',
  storage,
  whitelist: ['auth', 'ui'],     // Persist these slices
  blacklist: ['menu', 'inventory', 'staff'], // Don't persist these
}
```

### **3. Middleware Configuration**
```typescript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
```

## 🚀 **Getting Started**

### **1. Install Dependencies**
```bash
npm install @reduxjs/toolkit react-redux redux-persist
```

### **2. Wrap App with Provider**
```typescript
// app/layout.tsx
import { ReduxProvider } from '@/store/Provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
```

### **3. Use in Components**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginUser } from '@/store/slices/authSlice'

function LoginForm() {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector(state => state.auth)
  
  const handleSubmit = () => {
    dispatch(loginUser({ email, password }))
  }
  
  return (
    // Component JSX
  )
}
```

## 📚 **Additional Resources**

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux Persist Documentation](https://github.com/rt2zz/redux-persist)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- [TypeScript with Redux](https://redux-toolkit.js.org/usage/usage-with-typescript)
