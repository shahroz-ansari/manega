import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * The hook is used to get the viewport of device
 */
export default function useViewportWidth() {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  return {
    isMobileView,
  }
}
