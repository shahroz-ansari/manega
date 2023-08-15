import { useRouter } from 'next/router'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'

type CallbackType = (event: MouseEvent<HTMLElement> | null) => void

/**
 * The hook is used for navigation across app
 * it uses next router for navigation
 */
export default function useAppNavigation() {
  const { push, pathname } = useRouter()
  const navigate = useCallback(
    (path: string, cb: CallbackType | null = null) => {
      return (event: MouseEvent<HTMLElement> | null = null) => {
        if (typeof cb === 'function') cb(event)
        push(path)
      }
    },
    [push]
  )

  return { navigate, pathname }
}
