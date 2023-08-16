import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SOWForm from '@/components/features/sow/sow-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectSOW } from '@/constants'
import type {
  IdbStoreMSAType,
  IdbStoreProjectType,
  IdbStoreSOWType,
} from '@/db/types'
import usePathParam from '@/hooks/path-param'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { getMSAsByProjectId, getSOWById, updateSOW } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddProjects = () => {
  const { call: serviceUpdateSOW } = useServiceDispatcher(updateSOW)
  const { call: serviceGetSOW } = useServiceDispatcher(getSOWById)
  const { call: serviceGetMSA } = useServiceDispatcher(getMSAsByProjectId)
  const router = useRouter()
  const [sow, setSOW] = useState<IdbStoreSOWType | undefined>(undefined)
  const [msas, setMSAs] = useState<IdbStoreMSAType[]>([])

  const { project } = useProject()
  const sowId = usePathParam('sowId', true) as number

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
    if (sowId) {
      serviceGetSOW(
        {
          onSuccess(data: IdbStoreSOWType) {
            setSOW(data)
          },
        },
        sowId
      )
    }
  }, [sowId, serviceGetSOW])

  const handleSubmit = (data: IdbStoreProjectType) => {
    serviceUpdateSOW(
      {
        onSuccess() {
          router.push(generateLink(PathProjectSOW))
        },
      },
      { ...data, id: sow?.id }
    )
  }

  if (!project) return null
  return (
    <>
      <PageHeader
        title={'Edit SOW'}
        link={generateLink(PathProjectSOW)}
        linkText="Go back"
        linkVariant="text"
      />

      <SOWForm
        mode="edit"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        sow={sow}
        msas={msas}
      />
    </>
  )
}

export default PageAddProjects
