import { useRouter } from 'next/router'

import MSAForm from '@/components/features/msa/msa-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectMSA } from '@/constants'
import type { IdbStoreNewProjectType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { addNewMSA } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddMSA = () => {
  const { call: serviceAddMSA } = useServiceDispatcher(addNewMSA)
  const router = useRouter()

  const { project } = useProject()

  const handleSubmit = (data: IdbStoreNewProjectType) => {
    serviceAddMSA(
      {
        onSuccess() {
          router.push(generateLink(PathProjectMSA))
        },
      },
      data
    )
  }

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Add MSA'}
        link={generateLink(PathProjectMSA)}
        linkText="Go back"
        linkVariant="text"
      />

      <MSAForm mode="add" onFormSubmit={handleSubmit} projectId={project.id} />
    </>
  )
}

export default PageAddMSA
