import CssBaseline from '@mui/material/CssBaseline'
import type { ReactNode } from 'react'

import { MuiBox, MuiToolbar } from '@/mui/components'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'
import Sidebar from '@/templates/default/side-navigation'
import Topbar from '@/templates/default/top-navigation'

type DashboardTemplateProps = {
  children: ReactNode
}

export default function AppDefaultTemplate(props: DashboardTemplateProps) {
  const drawerWidth = useAppSelector(
    (state: RootState) => state.layout.drawerWidth
  )

  return (
    <MuiBox sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      />
      <MuiBox
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Sidebar />
      </MuiBox>
      <MuiBox
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <MuiToolbar />
        {props.children}
      </MuiBox>
    </MuiBox>
  )
}
