import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Months, Status, Years } from '@/constants'
import type {
  IdbStoreMSAType,
  IdbStoreNewTimesheetType,
  IdbStoreTimesheetType,
} from '@/db/types'
import {
  MuiButton,
  MuiMenuItem,
  MuiStack,
  MuiTextField,
} from '@/mui/components'

type Mode = 'add' | 'edit'

const TimesheetForm = ({
  mode,
  onFormSubmit,
  projectId,
  msas,
  timesheet,
}: {
  mode: Mode
  onFormSubmit: Function
  projectId: number
  timesheet?: IdbStoreTimesheetType
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
      year: '',
      month: '',
      status: '',
      type: '',
      created: new Date().toString(),
      projectId,
      msaId: 0,
    },
  })

  useEffect(() => {
    if (timesheet) reset(timesheet)
  }, [timesheet, reset])

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

  const onSubmit = (data: IdbStoreNewTimesheetType) => {
    onFormSubmit(data)
  }

  return (
    <>
      <MuiStack component="form" gap={2}>
        <Controller
          control={control}
          rules={{
            required: 'MSA is required field',
            validate: (value) => {
              if (value <= 0) return 'MSA is required field'
              return true
            },
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.msaId)}
              label="MSA"
              helperText={errors.msaId?.message || ''}
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
            required: 'Year is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.year)}
              label="Year"
              helperText={errors.year?.message || ''}
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
          name="year"
        />
        <Controller
          control={control}
          rules={{
            required: 'Month is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.month)}
              label="Month"
              helperText={errors.month?.message || ''}
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
          name="month"
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
        <Controller
          control={control}
          rules={{
            required: 'Type is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.type)}
              label="Type"
              helperText={errors.type?.message || ''}
              select
              {...field}
            >
              {['Client', 'Self'].map((option) => (
                <MuiMenuItem key={option} value={option}>
                  {option}
                </MuiMenuItem>
              ))}
            </MuiTextField>
          )}
          name="type"
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

export default TimesheetForm
