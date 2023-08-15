import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Status, Years } from '@/constants'
import type { IdbStoreMSAType, IdbStoreNewMSAType } from '@/db/types'
import {
  MuiButton,
  MuiMenuItem,
  MuiStack,
  MuiTextField,
} from '@/mui/components'

type Mode = 'add' | 'edit'

const MSAForm = ({
  mode,
  onFormSubmit,
  projectId,
  msa,
}: {
  mode: Mode
  onFormSubmit: Function
  projectId: number
  msa?: IdbStoreMSAType
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
    },
  })

  useEffect(() => {
    if (msa) reset(msa)
  }, [msa, reset])

  useEffect(() => {
    setValue('projectId', projectId)
  }, [projectId, setValue])

  const onSubmit = (data: IdbStoreNewMSAType) => {
    onFormSubmit(data)
  }

  return (
    <>
      <MuiStack component="form" gap={2}>
        <Controller
          control={control}
          rules={{
            required: 'From year name is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.from)}
              label="From year"
              helperText={errors.from?.message || ''}
              select
              {...field}
            >
              {Years.map((option) => (
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
            required: 'To year is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.to)}
              label="To year"
              helperText={errors.to?.message || ''}
              select
              {...field}
            >
              {Years.map((option) => (
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

export default MSAForm
