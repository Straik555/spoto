import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useFormikContext } from 'formik'

import { profileApi } from '@api/profile'
import { ROUTES } from '@constants/routes'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { forceTrim } from '@utils/forceTrim'

import {
  ChangePasswordFormValues,
  UseChangePassword,
} from './ChangePassword.model'

const useChangePassword: UseChangePassword = () => {
  const form = useFormikContext<ChangePasswordFormValues>()
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
  const [changeProfilePassword, { error, isSuccess, isError, isLoading }] =
    profileApi.endpoints.changeProfilePassword.useMutation()

  const { isValid, isSubmitting, setSubmitting, values } = form

  const toggleForgotPasswordModal = () =>
    setForgotPasswordModal((prevState) => !prevState)

  const handleSubmit = useCallback(() => {
    const { currentPassword, newPassword } = values as ChangePasswordFormValues
    changeProfilePassword({
      currentPassword: forceTrim(currentPassword),
      newPassword: forceTrim(newPassword),
    })
    setSubmitting(false)
    toggleForgotPasswordModal()
  }, [changeProfilePassword, setSubmitting, values])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password successfully changed!')
      if (!isDesktop) {
        router.push({ pathname: ROUTES.PROFILE_SETTINGS })
      }
    }
  }, [isDesktop, isSuccess, router])

  useEffect(() => {
    if (isError && error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.data.message)
    }
  }, [error, isError])

  const disabled = useMemo(() => {
    return !isValid || isSubmitting || isLoading
  }, [isLoading, isSubmitting, isValid])

  const state = {
    disabled,
    forgotPasswordModal,
  }
  const actions = {
    handleSubmit,
    toggleForgotPasswordModal,
  }
  return [state, actions]
}

export default useChangePassword
