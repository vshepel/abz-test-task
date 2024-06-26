import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { AxiosError } from 'axios'
import classes from './Form.module.scss'
import Button from '@/components/Button/Button.tsx'
import Input from '@/components/Input/Input.tsx'
import Radio from '@/components/Radio/Radio.tsx'
import Upload from '@/components/Upload/Upload.tsx'
import usePositions from '@/hooks/usePositions.ts'
import Loader from '@/components/Loader/Loader.tsx'
import { postUser } from '@/api/user.ts'

import successImage from '@/assets/images/success.svg'

interface Props {
  onSuccess?: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  position_id: number
  photo: FileList
}

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required field')
    .min(2, 'Should be from 2 characters')
    .max(60, 'Should not exceed 60 characters'),
  email: yup
    .string()
    .required('Email is a required field')
    .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Must be a valid email'),
  phone: yup
    .string()
    .required('Phone is required field')
    .min(9, 'Must be a valid phone number'),
  position_id: yup
    .number()
    .required('Position is required field'),
  photo: yup
    .mixed<FileList>()
    .required('You need to provide a photo')
    .test('required', 'You need to provide a photo', (fileList) => {
      return !!fileList.length
    })
    .test('fileType', 'Photo should be a jpg or jpeg', (fileList) => {
      return !!fileList.length && (fileList[0].type === 'image/jpeg' || fileList[0].type === 'image/jpg')
    })
    .test('fileSize', 'The photo size must not be greater than 5 Mb', (fileList) => {
      return fileList[0] && fileList[0].size <= 1024 * 1024 * 5
    })
    .test('imageSize', 'Minimum size of photo 70x70px', (fileList) => {
      if (!fileList.length)
        return false

      return new Promise((resolve) => {
        const reader = new FileReader()

        reader.readAsDataURL(fileList[0])
        reader.onload = function (image) {
          const img = new Image()

          img.src = image.target!.result as string
          img.onload = () => {
            resolve(img.width >= 70 && img.height >= 70)
          }
        }
      })
    }),
})

function Form({ onSuccess = () => {} }: Props) {
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const registerWithMask = useHookFormMask(register)
  const { isLoading, positions } = usePositions()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', `+380${data.phone}`)
    formData.append('position_id', String(data.position_id))
    formData.append('photo', data.photo[0])

    try {
      const response = await postUser(formData)

      if (response.status === 201) {
        reset()
        onSuccess()
      }
    }
    catch (error) {
      const err = error as AxiosError
      const res = err.response

      console.error(res)
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        {...register('name')}
        name="name"
        className={classes.form__field}
        label="Your name"
        error={errors.name}
      />
      <Input
        {...register('email')}
        name="email"
        className={classes.form__field}
        label="Email"
        type="email"
        error={errors.email}
      />
      <Input
        {...registerWithMask(
          'phone',
          '+38 (099) 999-99-99',
          {
            showMaskOnHover: false,
            autoUnmask: true,
            unmaskAsNumber: true,
          },
        )}
        name="phone"
        className={classes.form__field}
        label="Phone"
        type="tel"
        caption="+38 (XXX) XXX - XX - XX"
        error={errors.phone}
      />
      <fieldset className={classes.form__fieldset}>
        <legend>Select your position</legend>
        {positions.map(({ id, name }, index) => (
          <Radio
            key={id}
            value={id}
            {...register('position_id')}
            name="position_id"
            label={name}
            defaultChecked={!index}
          />
        ))}
        {isLoading && <Loader />}
      </fieldset>
      <Upload
        {...register('photo')}
        name="photo"
        className={classes.form__upload}
        accept=".jpeg, .jpg"
        error={errors.photo}
      />
      <Button
        className={classes.form__button}
        type="submit"
        disabled={isSubmitting || !isDirty || !isValid}
      >
        Sign up
      </Button>
    </form>
  )
}

function Success() {
  return (
    <div className={classes.form__success}>
      <img src={successImage} alt="Success" />
    </div>
  )
}

Form.Success = Success

export default Form
