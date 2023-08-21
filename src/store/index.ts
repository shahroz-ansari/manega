import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import invoice from './reducers/invoice'
import layout from './reducers/layout'
import msa from './reducers/msa'
import projects from './reducers/projects'
import sow from './reducers/sow'
import theme from './reducers/theme'
import timesheet from './reducers/timesheet'

export const store = configureStore({
  reducer: {
    theme,
    layout,
    projects,
    msa,
    sow,
    timesheet,
    invoice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
