import { ListItemButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PageHeader from '@/components/ui-kit/page-header'
import {
  PathProjectInvoiceCreate,
  PathProjectInvoiceEdit,
  Pending,
} from '@/constants'
import type { IdbStoreInvoiceType } from '@/db/types'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  MuiIconButton,
  MuiList,
  MuiListItemText,
  MuiStack,
} from '@/mui/components'
import { BorderColorIcon, CheckCircleIcon, WarningIcon } from '@/mui/icons'
import { getInvoicesByProjectId } from '@/services'
import type { RootState } from '@/store'
import { useAppSelector } from '@/store/hooks'
import { updateInvoiceList } from '@/store/reducers/invoice'
import generateLink from '@/utils/generateLink'

const PageInvoice = () => {
  const { call: serviceGetProjectInvoice } = useServiceDispatcher(
    getInvoicesByProjectId,
    updateInvoiceList
  )
  const { push } = useRouter()

  const invoices = useAppSelector((state: RootState) => state.invoice.list)

  const { project } = useProject()

  useEffect(() => {
    if (project?.id) serviceGetProjectInvoice({}, project?.id)
  }, [serviceGetProjectInvoice, project?.id])

  if (!project) return null

  return (
    <>
      <PageHeader
        title={'Invoice list'}
        link={generateLink(PathProjectInvoiceCreate)}
        linkText={'Create'}
      />

      <MuiList sx={{ width: '100%' }}>
        {invoices.map((value: IdbStoreInvoiceType) => (
          <ListItemButton
            disableGutters
            key={value.id}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <MuiStack
              gap={3}
              direction="row"
              display="flex"
              alignItems="center"
            >
              <MuiListItemText primary={`${value.month}, ${value.year}`} />
              {value.status === Pending ? (
                <WarningIcon color="warning" />
              ) : (
                <CheckCircleIcon color="success" />
              )}
            </MuiStack>
            <MuiIconButton
              aria-label="comment"
              onClick={() =>
                push(
                  generateLink(PathProjectInvoiceEdit, {
                    invoiceId: value.id,
                  })
                )
              }
            >
              <BorderColorIcon color="primary" />
            </MuiIconButton>
          </ListItemButton>
        ))}
      </MuiList>
    </>
  )
}

export default PageInvoice
