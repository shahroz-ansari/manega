import { ListItemButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import {
  PathProjectTimesheetCreate,
  PathProjectTimesheetEdit,
  Pending,
} from '@/constants'
import type { IdbStoreTimesheetType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  MuiIconButton,
  MuiList,
  MuiListItemText,
  MuiStack,
} from '@/mui/components'
import { BorderColorIcon, CheckCircleIcon, WarningIcon } from '@/mui/icons'
import { getTimesheetsByProjectId } from '@/services'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'
import { updateTimesheetList } from '@/store/reducers/timesheet'
import generateLink from '@/utils/generateLink'

const PageTimesheet = () => {
  const { call: serviceGetProjectTimesheet } = useServiceDispatcher(
    getTimesheetsByProjectId,
    updateTimesheetList
  )
  const { push } = useRouter()

  const timesheets = useAppSelector((state: RootState) => state.timesheet.list)

  const { project } = useProject()

  useEffect(() => {
    if (project?.id) serviceGetProjectTimesheet({}, project?.id)
  }, [serviceGetProjectTimesheet, project?.id])

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Timesheet list'}
        link={generateLink(PathProjectTimesheetCreate)}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {timesheets.map((value: IdbStoreTimesheetType) => (
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
              <MuiListItemText primary={`${value.month}, ${value.year}`} />
              {value.status === Pending ? (
                <WarningIcon color="warning" />
              ) : (
                <CheckCircleIcon color="success" />
              )}
            </MuiStack>
            <MuiIconButton
              aria-label="comment"
              onClick={() =>
                push(
                  generateLink(PathProjectTimesheetEdit, {
                    timesheetId: value.id,
                  })
                )
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

export default PageTimesheet
