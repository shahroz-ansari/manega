import type { MouseEvent, ReactNode } from 'react'

import { MuiMenu } from '@/mui/components'

export type UserMenuType = {
  elementReference: HTMLElement | null
  menuId: string
  toggleMenu: (event: MouseEvent<HTMLElement>) => void
  children: ReactNode
}
const UIMenu = ({
  elementReference,
  menuId,
  toggleMenu,
  children,
}: UserMenuType) => {
  return (
    <MuiMenu
      anchorEl={elementReference}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(elementReference)}
      onClose={toggleMenu}
      onClick={toggleMenu}
    >
      {children}
    </MuiMenu>
  )
}

export default UIMenu
