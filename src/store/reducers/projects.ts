import { createSlice } from '@reduxjs/toolkit'

import type { IdbStoreProjectType } from '@/db/types'

export type ProjectsType = {
  list: IdbStoreProjectType[]
  activeProject: IdbStoreProjectType | undefined
}

const initialState: ProjectsType = {
  list: [],
  activeProject: undefined,
}

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProjectsList: (state, action) => {
      state.list = action.payload
    },
    updateActiveProject: (state, action) => {
      state.activeProject = action.payload
    },
  },
})

export const { updateProjectsList, updateActiveProject } = slice.actions

export default slice.reducer
