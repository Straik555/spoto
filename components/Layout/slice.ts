import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LayoutSlice = {
  isOpenMenu: boolean
}

const initialState: LayoutSlice = {
  isOpenMenu: true,
}

export const layoutSlice = createSlice({
  name: 'layoutSlice',
  initialState,
  reducers: {
    setMenuState(state, action: PayloadAction<LayoutSlice['isOpenMenu']>) {
      state.isOpenMenu = action.payload
    },
  },
})
