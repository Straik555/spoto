import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import cn from 'classnames'

import authenticationApi from '@api/authentication'
import { RegisterUserParams } from '@api/authentication/types'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { forceTrim } from '@utils/forceTrim'

import { RegisterPageQueryParams, UseRegister } from './Register.model'

const useRegister: UseRegister = (props) => {
  const { houseName, inviteeEmail, switchToLogin } = props
  const [registerUser, { isSuccess, isError, error, isLoading }] =
    authenticationApi.endpoints.registerUser.useMutation()
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const form = useFormikContext<RegisterUserParams>()
  const { dirty, isValid, setFieldValue, values } = form
  const {
    email = '',
    invitationToken = '',
    token = '',
    qr = '',
  } = router.query as RegisterPageQueryParams

  const [userEmail, setUserEmail] = useState<string>('')

  const invitationTokenValue = useMemo(
    () => invitationToken || token || qr,
    [invitationToken, token, qr]
  )

  const prefilledUsernameOrEmail = useMemo(
    () => inviteeEmail || email,
    [email, inviteeEmail]
  )

  useEffect(() => {
    if (prefilledUsernameOrEmail) {
      setFieldValue('email', prefilledUsernameOrEmail)
    }
  }, [prefilledUsernameOrEmail, setFieldValue])

  const handleSubmit = useCallback(async (): Promise<void> => {
    const { email, password, phone } = values
    const data = {
      ...values,
      password: forceTrim(password),
      phone: `+${phone}`,
    }
    if (invitationTokenValue) {
      data.invitationToken = invitationTokenValue
    }
    registerUser(data)
    setUserEmail(email)
  }, [invitationTokenValue, registerUser, values])

  useEffect(() => {
    if (isError && error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.data?.message)
    }
  }, [isError, error])

  const disabled = useMemo(() => {
    return !(isValid && dirty) || isLoading
  }, [dirty, isLoading, isValid])

  const inputClassName = useMemo(
    () =>
      cn('!mt-0', {
        'mb-[15px]': isDesktop,
        'mb-[10px]': !isDesktop,
      }),
    [isDesktop]
  )

  const state = {
    disabled,
    inputClassName,
    isSuccess,
    userEmail,
    houseName,
    prefilledUsernameOrEmail,
  }
  const actions = { handleSubmit, switchToLogin }
  return [state, actions]
}

export default useRegister
