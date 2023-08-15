import { ListItemButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import {
  PathProjectDashboard,
  PathProjectEdit,
  PathProjectsCreate,
} from '@/constants'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { MuiIconButton, MuiList, MuiListItemText } from '@/mui/components'
import { BorderColorIcon } from '@/mui/icons'
import { getProjectById, getProjectList } from '@/services'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'
import {
  updateActiveProject,
  updateProjectsList,
} from '@/store/reducers/projects'
import generateLink from '@/utils/generateLink'

const PageProjects = () => {
  const { call: serviceGetProjects } = useServiceDispatcher(
    getProjectList,
    updateProjectsList
  )

  const { call: serviceGetProjectById } = useServiceDispatcher(
    getProjectById,
    updateActiveProject
  )

  const projects = useAppSelector((state: RootState) => state.projects.list)

  const { push } = useRouter()

  useEffect(() => {
    serviceGetProjects()
  }, [serviceGetProjects])

  const handleProjectSelection = (id: number) => {
    serviceGetProjectById(
      {
        onSuccess() {
          push(generateLink(PathProjectDashboard, { projectId: id }))
        },
      },
      id
    )
  }

  return (
    <>
      <PageHeader
        title={'Projects'}
        link={generateLink(PathProjectsCreate)}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {projects.map((value) => (
          <ListItemButton
            key={value.id}
            disableGutters
            onClick={() => handleProjectSelection(value.id)}
          >
            <MuiListItemText primary={value.name} />
            <MuiIconButton
              aria-label="comment"
              onClick={(e) => {
                e.stopPropagation()
                push(generateLink(PathProjectEdit, { projectId: value.id }))
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
