import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import InvoiceForm from '@/components/features/invoice/invoice-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectInvoice } from '@/constants'
import type { IdbStoreMSAType, IdbStoreNewProjectType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { addNewInvoice, getMSAsByProjectId } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddInvoice = () => {
  const { call: serviceAddInvoice } = useServiceDispatcher(addNewInvoice)
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
    serviceAddInvoice(
      {
        onSuccess() {
          router.push(generateLink(PathProjectInvoice))
        },
      },
      data
    )
  }

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Add Invoice'}
        link={generateLink(PathProjectInvoice)}
        linkText="Go back"
        linkVariant="text"
      />

      <InvoiceForm
        mode="add"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        msas={msas}
      />
    </>
  )
}

export default PageAddInvoice
