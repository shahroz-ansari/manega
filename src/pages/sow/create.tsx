import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SOWForm from '@/components/features/sow/sow-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectSOW } from '@/constants'
import type { IdbStoreMSAType, IdbStoreNewProjectType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { addNewSOW, getMSAsByProjectId } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddSOW = () => {
  const { call: serviceAddSOW } = useServiceDispatcher(addNewSOW)
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
    serviceAddSOW(
      {
        onSuccess() {
          router.push(generateLink(PathProjectSOW))
        },
      },
      data
    )
  }

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Add SOW'}
        link={generateLink(PathProjectSOW)}
        linkText="Go back"
        linkVariant="text"
      />

      <SOWForm
        mode="add"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        msas={msas}
      />
    </>
  )
}

export default PageAddSOW
