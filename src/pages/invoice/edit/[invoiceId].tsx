import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import InvoiceForm from '@/components/features/invoice/invoice-form'
import PageHeader from '@/components/ui-kit/page-header'
import { PathProjectInvoice } from '@/constants'
import type {
  IdbStoreInvoiceType,
  IdbStoreMSAType,
  IdbStoreProjectType,
} from '@/db/types'
import usePathParam from '@/hooks/path-param'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import { getInvoiceById, getMSAsByProjectId, updateInvoice } from '@/services'
import generateLink from '@/utils/generateLink'

const PageAddProjects = () => {
  const { call: serviceUpdateInvoice } = useServiceDispatcher(updateInvoice)
  const { call: serviceGetInvoice } = useServiceDispatcher(getInvoiceById)
  const { call: serviceGetMSA } = useServiceDispatcher(getMSAsByProjectId)
  const router = useRouter()
  const [invoice, setInvoice] = useState<IdbStoreInvoiceType | undefined>(
    undefined
  )
  const [msas, setMSAs] = useState<IdbStoreMSAType[]>([])

  const { project } = useProject()
  const invoiceId = usePathParam('invoiceId', true) as number

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
    if (invoiceId) {
      serviceGetInvoice(
        {
          onSuccess(data: IdbStoreInvoiceType) {
            setInvoice(data)
          },
        },
        invoiceId
      )
    }
  }, [invoiceId, serviceGetInvoice])

  const handleSubmit = (data: IdbStoreProjectType) => {
    serviceUpdateInvoice(
      {
        onSuccess() {
          router.push(generateLink(PathProjectInvoice))
        },
      },
      { ...data, id: invoice?.id }
    )
  }

  if (!project) return null
  return (
    <>
      <PageHeader
        title={'Edit Invoice'}
        link={generateLink(PathProjectInvoice)}
        linkText="Go back"
        linkVariant="text"
      />

      <InvoiceForm
        mode="edit"
        onFormSubmit={handleSubmit}
        projectId={project.id}
        invoice={invoice}
        msas={msas}
      />
    </>
  )
}

export default PageAddProjects
