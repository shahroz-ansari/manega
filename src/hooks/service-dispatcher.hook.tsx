import { useCallback, useState } from 'react'

import { useAppDispatch } from '@/store/hooks'

interface CallOptions {
  onSuccess?: Function | undefined
  onError?: Function | undefined
}

export default function useServiceDispatcher(
  service: Function,
  dispatcher: Function | null = null
) {
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const call = useCallback(
    async (options = {}, ...rest: any) => {
      const { onSuccess, onError }: CallOptions = options
      try {
        setLoading(true)
        setError(false)
        const data = await service(...rest)
        if (dispatcher) dispatch(dispatcher(data))
        onSuccess?.(data)
      } catch (e) {
        console.log('ERR::', e)
        setError(true)
        onError?.(e)
      } finally {
        setLoading(false)
      }
    },
    [dispatch, dispatcher, service]
  )

  return { call, error, loading }
}
