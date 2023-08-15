import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import type { IdbStoreNewProjectType, IdbStoreProjectType } from '@/db/types'
import { MuiButton, MuiStack, MuiTextField } from '@/mui/components'

type Mode = 'add' | 'edit'

const ProjectForm = ({
  mode,
  onFormSubmit,
  project,
}: {
  mode: Mode
  onFormSubmit: Function
  project?: IdbStoreProjectType
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (project) setValue('name', project.name)
  }, [project, setValue])

  const onSubmit = (data: IdbStoreNewProjectType) => {
    onFormSubmit(data)
  }

  return (
    <>
      <MuiStack component="form" gap={2}>
        <Controller
          control={control}
          rules={{
            required: 'Project name is required field',
          }}
          render={({ field }) => (
            <MuiTextField
              error={Boolean(errors.name)}
              label="Project name"
              helperText={errors.name?.message || ''}
              {...field}
            />
          )}
          name="name"
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

export default ProjectForm
