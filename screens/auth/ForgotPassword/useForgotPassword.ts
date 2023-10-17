import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { profileApi } from '@api/profile'
import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import { ResetProfilePasswordArgs } from '@api/profile/types'

import { UseForgotPassword } from './ForgotPassword.model'

const useForgotPassword: UseForgotPassword = () => {
  const { isDesktop } = useDeviceInfo()
  const [submitFailed, setSubmitFailed] = useState<boolean>(false)
  const [resetProfilePassword, { isSuccess, isError, isLoading, error }] =
    profileApi.endpoints.resetProfilePassword.useMutation()
  const [userEmail, setUserEmail] = useState<string>('')

  const form = useTypedFormikContext<ResetProfilePasswordArgs>()
  const { dirty, isSubmitting, isValid, setSubmitting, values } = form

  const handleSubmit = useCallback(() => {
    setUserEmail(values.email)
    resetProfilePassword(values)
    setSubmitting(false)
  }, [resetProfilePassword, setSubmitting, values])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Request is successfully sent!')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setUserEmail('')
      setSubmitFailed(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.data?.message)
    }
  }, [isError])

  const disabled = useMemo(
    () => !(isValid && dirty) || isSubmitting || isLoading,
    [dirty, isLoading, isSubmitting, isValid]
  )

  const state = { disabled, isDesktop, isSuccess, userEmail, submitFailed }
  const actions = { handleSubmit, setSubmitFailed }
  return [state, actions]
}

export default useForgotPassword
