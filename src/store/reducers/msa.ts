import { createSlice } from '@reduxjs/toolkit'

import type { IdbStoreMSAType } from '@/db/types'

export type ProjectsType = {
  list: IdbStoreMSAType[]
  activeMSA: IdbStoreMSAType | undefined
}

const initialState: ProjectsType = {
  list: [],
  activeMSA: undefined,
}

const slice = createSlice({
  name: 'msa',
  initialState,
  reducers: {
    updateMSAList: (state, action) => {
      state.list = action.payload
    },
    updateActiveMSA: (state, action) => {
      state.activeMSA = action.payload
    },
  },
})

export const { updateMSAList, updateActiveMSA } = slice.actions

export default slice.reducer
