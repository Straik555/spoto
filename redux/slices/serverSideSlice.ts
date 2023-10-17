import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isServerSide } from '@utils/isServerSide'

export type ServerSideSlice = {
  userAgent: string
}

const initialState: ServerSideSlice = {
  userAgent: isServerSide() ? '' : navigator.userAgent,
}

export const serverSideSlice = createSlice({
  name: 'serverSideSlice',
  initialState,
  reducers: {
    updateUserAgent(
      state,
      action: PayloadAction<ServerSideSlice['userAgent'] | undefined>
    ) {
      state.userAgent = action.payload || ''
    },
  },
})
