import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormikContext } from 'formik'
import _omit from 'lodash/omit'
import { CountryData } from 'react-phone-input-2'
import { useFieldError } from '@components/Form/hooks'
import { AUSTRALIAN_COUNTRY_CODE, DEFAULT_PHONE_CODE } from './constants'
import { UsePhoneInput } from './PhoneInput.model'

const usePhoneInput: UsePhoneInput = (props) => {
  const { name, hideFieldError } = props

  const form = useFormikContext()
  const {
    errors: formErrors,
    setErrors,
    getFieldMeta,
    getFieldProps,
    setFieldTouched,
    setFieldValue,
  } = form

  const fieldProps = getFieldProps(name)
  const fieldMeta = getFieldMeta(name)
  const fieldError = useFieldError(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const [validationError, setValidationError] = useState<string>('')

  const isAustralia = useMemo(
    () => fieldProps?.value?.slice(0, 2) === DEFAULT_PHONE_CODE,
    [fieldProps.value]
  )

  const handleBlur = useCallback((): void => {
    setFieldTouched(name, true, isAustralia)
  }, [isAustralia, name, setFieldTouched])

  const handleChange = useCallback(
    (value, country): void => {
      const { dialCode } = country as CountryData

      if (dialCode === DEFAULT_PHONE_CODE) {
        setValidationError('')
      }

      setFieldValue(name, value, isAustralia)
    },
    [isAustralia, name, setFieldValue]
  )

  const thirdChar = useMemo(
    () => (fieldProps.value || '').at(2),
    [fieldProps.value]
  )

  const masks = useMemo(() => {
    const isFourth = thirdChar === '4'
    if (isFourth) {
      return { [AUSTRALIAN_COUNTRY_CODE]: '| ... ... ...' }
    }
    return { [AUSTRALIAN_COUNTRY_CODE]: '| ... ... ... .', ge: '| ... ... ...' }
  }, [thirdChar])

  useEffect(() => {
    if ((fieldMeta?.value as string)?.length > 2) {
      inputRef?.current?.focus()
    }
  }, [fieldMeta.value, masks])

  const checkIfValid = useCallback((value, country) => {
    const { dialCode, format } = country as CountryData
    if (dialCode !== DEFAULT_PHONE_CODE) {
      const dots = format?.split('')?.filter((char) => char === '.')
      const isValid = value?.length === dots?.length

      if (isValid) {
        setValidationError('')
      } else {
        setValidationError('Phone number format is incorrect')
      }
    }
    return true
  }, [])

  useEffect(() => {
    if (!isAustralia) {
      const errors = _omit(formErrors, name)

      if (validationError) {
        errors[name] = validationError
      }
      setErrors(errors)
    }
  }, [formErrors, name, setErrors, validationError, isAustralia])

  const inputError = useMemo(
    () => (hideFieldError ? '' : fieldError || validationError),
    [fieldError, hideFieldError, validationError]
  )

  const state = {
    fieldValue: fieldProps.value,
    inputError,
    inputRef,
    isAustralia,
    masks,
  }
  const actions = { checkIfValid, handleBlur, handleChange }
  return [state, actions]
}

export default usePhoneInput
