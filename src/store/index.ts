import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

// Import your reducers here
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import menuReducer from './slices/menuSlice'
import inventoryReducer from './slices/inventorySlice'
import staffReducer from './slices/staffSlice'

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  menu: menuReducer,
  inventory: inventoryReducer,
  staff: staffReducer,
})

// SSR-safe storage configuration
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storageObject = typeof window !== 'undefined' ? storage : createNoopStorage()

// Persist configuration
const persistConfig = {
  key: 'aharta-root',
  storage: storageObject,
  whitelist: ['auth', 'ui'], // Only persist auth and ui state
  blacklist: ['menu', 'inventory', 'staff'], // Don't persist these as they're fetched from API
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

// Persistor
export const persistor = persistStore(store)

// Export types
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
