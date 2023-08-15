import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function usePathParam(param: string, parseToInt: boolean) {
  const router = useRouter()

  const value = useMemo(() => {
    if (!router.isReady) return ''

    const qp = router.query[param]
    const queryParamValue = (Array.isArray(qp) ? qp[0] : qp) as string
    return parseToInt ? parseInt(queryParamValue, 10) : queryParamValue
  }, [param, parseToInt, router.isReady, router.query])

  return value
}
