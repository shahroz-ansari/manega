import type { MouseEvent } from 'react'
import { useCallback, useState } from 'react'

/**
 * The hook is used for handling the toggling of MUI Menu
 */
export default function useMenuToggler() {
  const [togglerReference, setTogglerReference] = useState<HTMLElement | null>(
    null
  )
  const toggleMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setTogglerReference((isOpen) => (isOpen ? null : event.currentTarget))
  }, [])
  return { togglerReference, toggleMenu }
}
