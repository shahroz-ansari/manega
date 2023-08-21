import { createSlice } from '@reduxjs/toolkit'

import type { IdbStoreTimesheetType } from '@/db/types'

export type ProjectsType = {
  list: IdbStoreTimesheetType[]
}

const initialState: ProjectsType = {
  list: [],
}

const slice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    updateTimesheetList: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { updateTimesheetList } = slice.actions

export default slice.reducer
