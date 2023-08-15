import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ProjectForm from '@/components/features/projects/project-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjects } from '@/constants'
import type { IdbStoreProjectType } from '@/db/types'
import usePathParam from '@/hooks/path-param'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { getProjectById, updateProject } from '@/services'
import generateLink from '@/utils/generateLink'

const PageEditProject = () => {
  const { call: serviceUpdateproject } = useServiceDispatcher(updateProject)
  const { call: serviceGetproject } = useServiceDispatcher(getProjectById)
  const router = useRouter()
  const [project, setProject] = useState<IdbStoreProjectType | undefined>(
    undefined
  )

  const projectId = usePathParam('projectId', true)

  useEffect(() => {
    serviceGetproject(
      {
        onSuccess(data: IdbStoreProjectType) {
          setProject(data)
        },
      },
      projectId
    )
  }, [projectId, serviceGetproject])

  const handleSubmit = (data: IdbStoreProjectType) => {
    serviceUpdateproject(
      {
        onSuccess() {
          router.push(generateLink(PathProjects))
        },
      },
      { ...data, id: projectId }
    )
  }
  return (
    <>
      <PageHeader
        title={'Edit Project'}
        link={generateLink(PathProjects)}
        linkText="Go back"
        linkVariant="text"
      />

      <ProjectForm mode="edit" onFormSubmit={handleSubmit} project={project} />
    </>
  )
}

export default PageEditProject
