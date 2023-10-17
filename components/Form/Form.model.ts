import { TitleProps } from '@components/Title/Title.model'
import { FormikConfig } from 'formik'
import { FormikValues } from 'formik/dist/types'

export type FormProps<Values extends FormikValues = FormikValues> = {
  className?: string
} & Omit<FormikConfig<Values>, 'onSubmit'>

export type InputLabelProps = {
  noCap?: boolean
  className?: string
} & TitleProps
