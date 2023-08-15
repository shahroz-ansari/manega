import { useRouter } from 'next/router'

import { PathProjects } from '@/constants'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'

interface PropsType {
  projectRedirect?: boolean
  msaRedirect?: boolean
}
export default function useProject(props?: PropsType) {
  const { projectRedirect = true, msaRedirect = false } = props || {}
  const { push, isReady } = useRouter()
  const project = useAppSelector(
    (state: RootState) => state.projects.activeProject
  )
  const msa = useAppSelector((state: RootState) => state.msa.activeMSA)

  if ((isReady && projectRedirect && !project) || (msaRedirect && !msa))
    push(PathProjects)

  return { project, msa }
}
