import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import PageHeader from '@/components/ui-kit/page-header'
import { PathProjects } from '@/constants'
import useProject from '@/hooks/project.hook'
import useServiceDispatcher from '@/hooks/service-dispatcher.hook'
import {
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiMenuItem,
  MuiStack,
  MuiTextField,
} from '@/mui/components'
import { getMSAsByProjectId } from '@/services'
import type { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateActiveMSA, updateMSAList } from '@/store/reducers/msa'
import generateLink from '@/utils/generateLink'

const PageProjects = () => {
  const dispatch = useAppDispatch()
  const { call: serviceGetProjectMSA } = useServiceDispatcher(
    getMSAsByProjectId,
    updateMSAList
  )
  const { project, msa } = useProject()
  const msaList = useAppSelector((state: RootState) => state.msa.list)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      msaId: msa?.id || '',
    },
  })

  useEffect(() => {
    if (project?.id) serviceGetProjectMSA({}, project?.id)
  }, [serviceGetProjectMSA, project?.id])

  const onSubmit = (data: { msaId: number | string }) => {
    dispatch(
      updateActiveMSA(msaList.find((v) => v.id === data.msaId) || undefined)
    )
  }

  return (
    <>
      <PageHeader
        title={'Dashboard'}
        link={generateLink(PathProjects)}
        linkText={'Go back'}
        linkVariant="text"
      />

      <MuiCard>
        <MuiCardContent>
          <MuiStack component="form" gap={2}>
            <Controller
              control={control}
              rules={{
                required: 'MSA is required field',
              }}
              render={({ field }) => (
                <MuiTextField
                  fullWidth
                  error={Boolean(errors.msaId)}
                  label="MSA"
                  helperText={errors.msaId?.message || ''}
                  select
                  {...field}
                >
                  {msaList.map((v) => (
                    <MuiMenuItem key={v.id} value={v.id}>
                      {`${v.from} - ${v.to}`}
                    </MuiMenuItem>
                  ))}
                </MuiTextField>
              )}
              name="msaId"
            />
            <MuiButton
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Checkout
            </MuiButton>
          </MuiStack>
        </MuiCardContent>
      </MuiCard>
    </>
  )
}

export default PageProjects
