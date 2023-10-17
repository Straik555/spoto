import { useFormikContext } from 'formik'

export const useFieldError = (name: string): string | undefined => {
  const formikCtx = useFormikContext()
  const formikFieldMeta = formikCtx.getFieldMeta(name)
  const errorVisible = formikFieldMeta.touched && formikFieldMeta.error

  if (!errorVisible) return

  return formikFieldMeta.error
}
