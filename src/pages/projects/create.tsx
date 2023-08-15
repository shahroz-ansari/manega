import { useRouter } from 'next/router'

import ProjectForm from '@/components/features/projects/project-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjects } from '@/constants'
import type { IdbStoreNewProjectType } from '@/db/types'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { addNewProject } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddProjects = () => {
  const { call: serviceAddProjects } = useServiceDispatcher(addNewProject)
  const router = useRouter()

  const handleSubmit = (data: IdbStoreNewProjectType) => {
    serviceAddProjects(
      {
        onSuccess() {
          router.push(generateLink(PathProjects))
        },
      },
      data
    )
  }

  return (
    <>
      <PageHeader
        title={'Add Project'}
        link={generateLink(PathProjects)}
        linkText="Go back"
        linkVariant="text"
      />

      <ProjectForm mode="add" onFormSubmit={handleSubmit} />
    </>
  )
}

export default PageAddProjects
