import { useFormikContext } from 'formik'
import { FormikContextType } from 'formik/dist/types'

export type TypedFormikContextType<Values> = {
  setFieldValue: (
    field: keyof Values,
    value: any,
    shouldValidate?: boolean
  ) => void
} & Omit<FormikContextType<Values>, 'setFieldValue'>

export const useTypedFormikContext = <
  Values
>(): TypedFormikContextType<Values> => {
  return useFormikContext<Values>() as TypedFormikContextType<Values>
}
