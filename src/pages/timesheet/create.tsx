import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import TimesheetForm from '@/components/features/timesheet/timesheet-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectTimesheet } from '@/constants'
import type { IdbStoreMSAType, IdbStoreNewProjectType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { addNewTimesheet, getMSAsByProjectId } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddTimesheet = () => {
  const { call: serviceAddTimesheet } = useServiceDispatcher(addNewTimesheet)
  const { call: serviceGetMSA } = useServiceDispatcher(getMSAsByProjectId)
  const router = useRouter()

  const [msas, setMSAs] = useState<IdbStoreMSAType[]>([])

  const { project } = useProject()

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

  const handleSubmit = (data: IdbStoreNewProjectType) => {
    serviceAddTimesheet(
      {
        onSuccess() {
          router.push(generateLink(PathProjectTimesheet))
        },
      },
      data
    )
  }

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Add Timesheet'}
        link={generateLink(PathProjectTimesheet)}
        linkText="Go back"
        linkVariant="text"
      />

      <TimesheetForm
        mode="add"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        msas={msas}
      />
    </>
  )
}

export default PageAddTimesheet
