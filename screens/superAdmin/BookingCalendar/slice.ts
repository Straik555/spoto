import { AdminBookingInfo } from '@api/booking/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SelectedBookingInfo = {
  col: number
  rowStart: number
  rowEnd: number
  data?: AdminBookingInfo
  id: string
}

export type SuperAdminBookingCalendarSlice = {
  selectedGridItem: SelectedBookingInfo | null
}

const initialState: SuperAdminBookingCalendarSlice = {
  selectedGridItem: null,
}

export const superAdminBookingCalendarSlice = createSlice({
  name: 'superAdminBookingCalendarSlice',
  initialState,
  reducers: {
    setSelectedGridItem(
      state,
      action: PayloadAction<
        SuperAdminBookingCalendarSlice['selectedGridItem'] | null
      >
    ) {
      state.selectedGridItem = action.payload
    },
  },
})
