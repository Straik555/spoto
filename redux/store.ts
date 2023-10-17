import { authBaseApiSlice, baseApiSlice } from '@api/index'
import { RESET_STATE_ACTION_TYPE } from '@redux/actions/resetState'
import { serverSideSlice } from '@redux/slices/serverSideSlice'
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { adminSpotsSlice } from '@screens/admin/Spots/slice'
import { adminUsersSlice } from '@screens/admin/Users/slice'
import { authSlice } from '@screens/auth/slice'
import { layoutSlice } from '@components/Layout/slice'
import { superAdminBookingCalendarSlice } from '@screens/superAdmin/BookingCalendar/slice'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 * Redux Toolkit store setup
 */
const reducers = {
  [serverSideSlice.name]: serverSideSlice.reducer,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  [authBaseApiSlice.reducerPath]: authBaseApiSlice.reducer,
  [adminUsersSlice.name]: adminUsersSlice.reducer,
  [adminSpotsSlice.name]: adminSpotsSlice.reducer,
  [superAdminBookingCalendarSlice.name]: superAdminBookingCalendarSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
}

const combinedRootReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState
  }

  return combinedRootReducer(state, action)
}

export type GetStoreOpts = {
  preloadedState?: SerializableRootState
  memoized?: boolean
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    baseApiSlice.reducerPath,
    authBaseApiSlice.reducerPath,
    serverSideSlice.name,
    layoutSlice.name,
  ],
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

let memoizedStore

export const getStore = (opts?: GetStoreOpts) => {
  if (opts?.memoized && memoizedStore) return memoizedStore

  const store = (memoizedStore = configureStore({
    reducer: persistedRootReducer,
    preloadedState: opts?.preloadedState || {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([baseApiSlice.middleware, authBaseApiSlice.middleware]),
  }))

  setupListeners(store.dispatch)

  return memoizedStore
}

export type RootState = ReturnType<typeof combinedRootReducer>
export type SerializableRootState = Omit<RootState, 'serverSideSlice'>
export type AppStateManager = ReturnType<typeof getStore>
export type AppDispatch = AppStateManager['dispatch']
