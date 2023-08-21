import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import TimesheetForm from '@/components/features/timesheet/timesheet-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectTimesheet } from '@/constants'
import type {
  IdbStoreMSAType,
  IdbStoreProjectType,
  IdbStoreTimesheetType,
} from '@/db/types'
import usePathParam from '@/hooks/path-param'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  getMSAsByProjectId,
  getTimesheetById,
  updateTimesheet,
} from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddProjects = () => {
  const { call: serviceUpdateTimesheet } = useServiceDispatcher(updateTimesheet)
  const { call: serviceGetTimesheet } = useServiceDispatcher(getTimesheetById)
  const { call: serviceGetMSA } = useServiceDispatcher(getMSAsByProjectId)
  const router = useRouter()
  const [timesheet, setTimesheet] = useState<IdbStoreTimesheetType | undefined>(
    undefined
  )
  const [msas, setMSAs] = useState<IdbStoreMSAType[]>([])

  const { project } = useProject()
  const timesheetId = usePathParam('timesheetId', true) as number

  useEffect(() => {
    if (project?.id)
      serviceGetMSA(
        {
          onSuccess(list: IdbStoreMSAType[]) {
            setMSAs(list)
          },
        },
        project?.id
      )
  }, [project?.id, serviceGetMSA])

  useEffect(() => {
    if (timesheetId) {
      serviceGetTimesheet(
        {
          onSuccess(data: IdbStoreTimesheetType) {
            setTimesheet(data)
          },
        },
        timesheetId
      )
    }
  }, [timesheetId, serviceGetTimesheet])

  const handleSubmit = (data: IdbStoreProjectType) => {
    serviceUpdateTimesheet(
      {
        onSuccess() {
          router.push(generateLink(PathProjectTimesheet))
        },
      },
      { ...data, id: timesheet?.id }
    )
  }

  if (!project) return null
  return (
    <>
      <PageHeader
        title={'Edit Timesheet'}
        link={generateLink(PathProjectTimesheet)}
        linkText="Go back"
        linkVariant="text"
      />

      <TimesheetForm
        mode="edit"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        timesheet={timesheet}
        msas={msas}
      />
    </>
  )
}

export default PageAddProjects
