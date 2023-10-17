import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersonTabs } from '@screens/admin/Users/Users.model'

export type AdminUsersSlice = {
  selectedPersonTab: PersonTabs
}

const initialState: AdminUsersSlice = {
  selectedPersonTab: PersonTabs.Main,
}

export const adminUsersSlice = createSlice({
  name: 'adminUsersSlice',
  initialState,
  reducers: {
    setSelectedPersonTab(
      state,
      action: PayloadAction<AdminUsersSlice['selectedPersonTab']>
    ) {
      state.selectedPersonTab = action.payload
    },
  },
})
