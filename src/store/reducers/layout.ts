import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type LayoutType = {
  drawerWidth: number
  drawerVisibility: boolean
}

const initialState: LayoutType = {
  drawerWidth: 240,
  drawerVisibility: false,
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload
    },
    setDrawerVisibility: (state, action: PayloadAction<boolean>) => {
      state.drawerVisibility = action.payload
    },
  },
})

export const { setDrawerWidth, setDrawerVisibility } = slice.actions

export default slice.reducer
