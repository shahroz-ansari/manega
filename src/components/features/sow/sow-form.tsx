import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Months, Status } from '@/constants'
import type {
  IdbStoreMSAType,
  IdbStoreNewSOWType,
  IdbStoreSOWType,
} from '@/db/types'
import {
  MuiButton,
  MuiMenuItem,
  MuiStack,
  MuiTextField,
} from '@/mui/components'

type Mode = 'add' | 'edit'

const SOWForm = ({
  mode,
  onFormSubmit,
  projectId,
  msas,
  sow,
}: {
  mode: Mode
  onFormSubmit: Function
  projectId: number
  sow?: IdbStoreSOWType
  msas: IdbStoreMSAType[]
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      from: '',
      to: '',
      status: '',
      created: new Date().toString(),
      projectId,
      msaId: 0,
    },
  })

  useEffect(() => {
    if (sow) reset(sow)
  }, [sow, reset])

  useEffect(() => {
    if (msas?.length)
      setValue(
        'msaId',
        msas.reduce((prev, current) => (current.id > prev.id ? current : prev))
          ?.id
      )
  }, [msas, setValue])

  useEffect(() => {
    setValue('projectId', projectId)
  }, [projectId, setValue])

  const onSubmit = (data: IdbStoreNewSOWType) => {
    onFormSubmit(data)
  }

  return (
    <>
      <MuiStack component="form" gap={2}>
        <Controller
          control={control}
          rules={{
            required: 'MSA is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.from)}
              label="MSA"
              helperText={errors.from?.message || ''}
              select
              {...field}
            >
              {msas.map((msa) => (
                <MuiMenuItem key={msa.id} value={msa.id}>
                  {`${msa.from} - ${msa.to}`}
                </MuiMenuItem>
              ))}
            </MuiTextField>
          )}
          name="msaId"
        />
        <Controller
          control={control}
          rules={{
            required: 'From month name is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.from)}
              label="From month"
              helperText={errors.from?.message || ''}
              select
              {...field}
            >
              {Months.map((option) => (
                <MuiMenuItem key={option} value={option}>
                  {option}
                </MuiMenuItem>
              ))}
            </MuiTextField>
          )}
          name="from"
        />
        <Controller
          control={control}
          rules={{
            required: 'To month is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.to)}
              label="To month"
              helperText={errors.to?.message || ''}
              select
              {...field}
            >
              {Months.map((option) => (
                <MuiMenuItem key={option} value={option}>
                  {option}
                </MuiMenuItem>
              ))}
            </MuiTextField>
          )}
          name="to"
        />
        <Controller
          control={control}
          rules={{
            required: 'Status is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.status)}
              label="Status"
              helperText={errors.status?.message || ''}
              select
              {...field}
            >
              {Status.map((option) => (
                <MuiMenuItem key={option} value={option}>
                  {option}
                </MuiMenuItem>
              ))}
            </MuiTextField>
          )}
          name="status"
        />

        <MuiButton
          variant="contained"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {mode === 'edit' ? 'Update' : 'Add'}
        </MuiButton>
      </MuiStack>
    </>
  )
}

export default SOWForm
