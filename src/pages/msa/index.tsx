import { ListItemButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import {
  PathProjectDashboard,
  PathProjectMSACreate,
  PathProjectMSAEdit,
  Pending,
} from '@/constants'
import type { IdbStoreMSAType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  MuiIconButton,
  MuiList,
  MuiListItemText,
  MuiStack,
} from '@/mui/components'
import { BorderColorIcon, CheckCircleIcon, WarningIcon } from '@/mui/icons'
import { getMSAsByProjectId } from '@/services'
import type { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateActiveMSA, updateMSAList } from '@/store/reducers/msa'
import generateLink from '@/utils/generateLink'

const PageProjects = () => {
  const { call: serviceGetProjectMSA } = useServiceDispatcher(
    getMSAsByProjectId,
    updateMSAList
  )
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const msas = useAppSelector((state: RootState) => state.msa.list)

  const { project } = useProject()

  useEffect(() => {
    if (project?.id) serviceGetProjectMSA({}, project?.id)
  }, [serviceGetProjectMSA, project?.id])

  if (!project?.id) return null

  return (
    <>
      <PageHeader
        title={'MSAs'}
        link={generateLink(PathProjectMSACreate)}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {msas.map((value: IdbStoreMSAType) => (
          <ListItemButton
            key={value.id}
            disableGutters
            onClick={(e) => {
              e.stopPropagation()
              dispatch(updateActiveMSA(value))
              push(generateLink(PathProjectDashboard))
            }}
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
              onClick={(e) => {
                e.stopPropagation()
                push(
                  generateLink(PathProjectMSAEdit, {
                    msaId: value.id,
                  })
                )
              }}
            >
              <BorderColorIcon color="primary" />
            </MuiIconButton>
          </ListItemButton>
        ))}
      </MuiList>
    </>
  )
}

export default PageProjects
