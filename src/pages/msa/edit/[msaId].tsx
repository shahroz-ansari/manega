import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import MSAForm from '@/components/features/msa/msa-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectMSA } from '@/constants'
import type { IdbStoreMSAType, IdbStoreProjectType } from '@/db/types'
import usePathParam from '@/hooks/path-param'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { getMSAById, updateMSA } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddProjects = () => {
  const { call: serviceUpdateMSA } = useServiceDispatcher(updateMSA)
  const { call: serviceGetMSA } = useServiceDispatcher(getMSAById)
  const router = useRouter()
  const [msa, setMSA] = useState<IdbStoreMSAType | undefined>(undefined)

  const { project } = useProject()
  const msaId = usePathParam('msaId', true) as number

  useEffect(() => {
    if (msaId) {
      serviceGetMSA(
        {
          onSuccess(data: IdbStoreMSAType) {
            setMSA(data)
          },
        },
        msaId
      )
    }
  }, [msaId, serviceGetMSA])

  const handleSubmit = (data: IdbStoreProjectType) => {
    serviceUpdateMSA(
      {
        onSuccess() {
          router.push(generateLink(PathProjectMSA))
        },
      },
      { ...data, id: msa?.id }
    )
  }

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Edit MSA'}
        link={generateLink(PathProjectMSA)}
        linkText="Go back"
        linkVariant="text"
      />

      <MSAForm
        mode="edit"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        msa={msa}
      />
    </>
  )
}

export default PageAddProjects
