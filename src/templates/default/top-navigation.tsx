import type { AppBarProps } from '@mui/material'

import useAppNavigation from '@/hooks/app-navigation.hook'
import useViewportWidth from '@/hooks/viewport-width.hook'
import {
  MuiAppBar,
  MuiBox,
  MuiIconButton,
  MuiToolbar,
  MuiTypography,
} from '@/mui/components'
import { MenuIcon } from '@/mui/icons'
import type { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDrawerVisibility } from '@/store/reducers/layout'

const Topbar = (props: AppBarProps) => {
  const dispatch = useAppDispatch()
  const { isMobileView } = useViewportWidth()
  const drawerVisibility = useAppSelector(
    (state: RootState) => state.layout.drawerVisibility
  )
  const activeProject = useAppSelector(
    (state: RootState) => state.projects.activeProject
  )
  const { navigate } = useAppNavigation()

  return (
    <MuiAppBar {...props}>
      <MuiToolbar>
        {isMobileView && (
          <MuiIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(setDrawerVisibility(!drawerVisibility))}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </MuiIconButton>
        )}
        <MuiTypography
          variant="h6"
          noWrap
          component="div"
          onClick={navigate('/projects')}
        >
          {activeProject?.name || ''}
        </MuiTypography>
        <MuiBox sx={{ flexGrow: 1 }} />
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default Topbar
