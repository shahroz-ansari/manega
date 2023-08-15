import { createSlice } from '@reduxjs/toolkit'

import type { IdbStoreSOWType } from '@/db/types'

export type ProjectsType = {
  list: IdbStoreSOWType[]
}

const initialState: ProjectsType = {
  list: [],
}

const slice = createSlice({
  name: 'sow',
  initialState,
  reducers: {
    updateSOWList: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { updateSOWList } = slice.actions

export default slice.reducer
