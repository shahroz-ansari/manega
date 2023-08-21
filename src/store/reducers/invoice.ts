import { createSlice } from '@reduxjs/toolkit'

import type { IdbStoreInvoiceType } from '@/db/types'

export type ProjectsType = {
  list: IdbStoreInvoiceType[]
}

const initialState: ProjectsType = {
  list: [],
}

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateInvoiceList: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { updateInvoiceList } = slice.actions

export default slice.reducer
