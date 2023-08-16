import { ListItemButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectSOWCreate, PathProjectSOWEdit, Pending } from '@/constants'
import type { IdbStoreSOWType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  MuiIconButton,
  MuiList,
  MuiListItemText,
  MuiStack,
} from '@/mui/components'
import { BorderColorIcon, CheckCircleIcon, WarningIcon } from '@/mui/icons'
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
  const { push } = useRouter()

  const sows = useAppSelector((state: RootState) => state.sow.list)

  const { project } = useProject()

  useEffect(() => {
    if (project?.id) serviceGetProjectSOW({}, project?.id)
  }, [serviceGetProjectSOW, project?.id])

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'SOW list'}
        link={generateLink(PathProjectSOWCreate)}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {sows.map((value: IdbStoreSOWType) => (
          <ListItemButton
            disableGutters
            key={value.id}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <MuiStack
              gap={3}
              direction="row"
              display="flex"
              alignItems="center"
            >
              <MuiListItemText primary={`${value.from} - ${value.to}`} />
              {value.status === Pending ? (
                <WarningIcon color="warning" />
              ) : (
                <CheckCircleIcon color="success" />
              )}
            </MuiStack>
            <MuiIconButton
              aria-label="comment"
              onClick={() =>
                push(generateLink(PathProjectSOWEdit, { sowId: value.id }))
              }
            >
              <BorderColorIcon color="primary" />
            </MuiIconButton>
          </ListItemButton>
        ))}
      </MuiList>
    </>
  )
}

export default PageSOW
