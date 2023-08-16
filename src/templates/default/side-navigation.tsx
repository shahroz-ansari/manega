import { type SvgIcon } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { PathProjects } from '@/constants'
import useAppNavigation from '@/hooks/app-navigation.hook'
import useProject from '@/hooks/project.hook'
import useViewportWidth from '@/hooks/viewport-width.hook'
import {
  MuiDrawer,
  MuiList,
  MuiListItem,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
} from '@/mui/components'
import { DashboardIcon } from '@/mui/icons'
import type { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDrawerVisibility } from '@/store/reducers/layout'

type SidebarItemProps = {
  title: string
  icon: typeof SvgIcon
  path: string
  auth?: boolean
  playerMode?: boolean
  expertMode?: boolean
}

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const drawerWidth = useAppSelector(
    (state: RootState) => state.layout.drawerWidth
  )
  const drawerVisibility = useAppSelector(
    (state: RootState) => state.layout.drawerVisibility
  )
  const { isMobileView } = useViewportWidth()
  const { pathname } = useAppNavigation()

  const { project } = useProject({ projectRedirect: false })

  const publicMenu = useMemo(
    () => [
      {
        title: 'Projects',
        icon: DashboardIcon,
        path: PathProjects,
      },
    ],
    []
  )

  const projectMenu = useMemo(
    () => [
      {
        title: 'MSA',
        icon: DashboardIcon,
        path: '/msa',
      },
      {
        title: 'SOW',
        icon: DashboardIcon,
        path: '/sow',
      },
    ],
    []
  )

  return (
    <MuiDrawer
      variant={isMobileView ? 'temporary' : 'permanent'}
      open={!isMobileView || drawerVisibility}
      onClose={() => dispatch(setDrawerVisibility(!drawerVisibility))}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      <MuiList
        sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      >
        {[...publicMenu, ...(project ? projectMenu : [])].map(
          (item: SidebarItemProps, listIndex: number) => (
            <Link href={item.path} legacyBehavior key={listIndex}>
              <MuiListItem disablePadding>
                <MuiListItemButton selected={item.path.startsWith(pathname)}>
                  <MuiListItemIcon>
                    <item.icon />
                  </MuiListItemIcon>
                  <MuiListItemText primary={item.title} />
                </MuiListItemButton>
              </MuiListItem>
            </Link>
          )
        )}
        <MuiListItem disablePadding sx={{ mt: 'auto' }}>
          <MuiListItemButton onClick={() => null}></MuiListItemButton>
        </MuiListItem>
      </MuiList>
    </MuiDrawer>
  )
}

export default Sidebar
