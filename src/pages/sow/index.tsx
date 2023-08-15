import { ListItemButton } from '@mui/material'
import Link from 'next/link'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectSOWCreate, PathProjectSOWEdit } from '@/constants'
import type { IdbStoreSOWType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { MuiIconButton, MuiList, MuiListItemText } from '@/mui/components'
import { BorderColorIcon } from '@/mui/icons'
import { getSOWsByProjectId } from '@/services'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'
import { updateSOWList } from '@/store/reducers/sow'
import generateLink from '@/utils/generateLink'

const PageSOW = () => {
  const { call: serviceGetProjectSOW } = useServiceDispatcher(
    getSOWsByProjectId,
    updateSOWList
  )

  const sows = useAppSelector((state: RootState) => state.sow.list)

  const { projectId } = useProject()

  useEffect(() => {
    if (projectId) serviceGetProjectSOW({}, projectId)
  }, [serviceGetProjectSOW, projectId])

  if (!projectId) return null

  return (
    <>
      <PageHeader
        title={'SOW list'}
        link={generateLink(PathProjectSOWCreate, { projectId })}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {sows.map((value: IdbStoreSOWType) => (
          <Link href="/" key={value.id} legacyBehavior>
            <ListItemButton disableGutters>
              <MuiListItemText primary={`${value.from} - ${value.to}`} />
              <Link
                href={generateLink(PathProjectSOWEdit, {
                  projectId,
                  msaId: value.id,
                })}
              >
                <MuiIconButton aria-label="comment">
                  <BorderColorIcon color="primary" />
                </MuiIconButton>
              </Link>
            </ListItemButton>
          </Link>
        ))}
      </MuiList>
    </>
  )
}

export default PageSOW
