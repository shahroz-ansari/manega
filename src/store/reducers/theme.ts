import { createSlice } from '@reduxjs/toolkit'

export type ThemeType = {
  mode: string
}

const initialState: ThemeType = {
  mode: 'light',
}

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeDarkMode: (state) => {
      state.mode = 'dark'
    },
    themeLightMode: (state) => {
      state.mode = 'light'
    },
  },
})

export const { themeDarkMode, themeLightMode } = slice.actions

export default slice.reducer
