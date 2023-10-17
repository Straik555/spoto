import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AdminSpotsSlice = {
  selectedUsersTab: 'users' | 'user groups'
}

const initialState: AdminSpotsSlice = {
  selectedUsersTab: 'users',
}

export const adminSpotsSlice = createSlice({
  name: 'adminSpotsSlice',
  initialState,
  reducers: {
    setSelectedUsersTab(
      state,
      action: PayloadAction<AdminSpotsSlice['selectedUsersTab']>
    ) {
      state.selectedUsersTab = action.payload
    },
  },
})
