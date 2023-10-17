import { useTypedFormikContext } from '@hooks/useTypedFormikContext'
import useAuthenticateUser from '@screens/auth/hooks/useAuthenticateUser'
import {
  AuthenticateUserFormValues,
  UseLogin,
} from '@screens/auth/Login/Login.model'

import { LoginQueryParams } from '@screens/auth/types'
import { forceTrim } from '@utils/forceTrim'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

const useLogin: UseLogin = (props) => {
  const { inviteeEmail, switchToRegister } = props
  const router = useRouter()
  const form = useTypedFormikContext<AuthenticateUserFormValues>()
  const { isValid, setFieldValue, setSubmitting, values } = form
  const queryParams = router.query as LoginQueryParams
  const { expiredEmail } = queryParams
  const { authenticateUser, isSuccess, isLoading } = useAuthenticateUser()

  useEffect(() => {
    if (expiredEmail) {
      toast.error('Your session expired, please re-login')
    }
  }, [expiredEmail])

  const prefilledUsernameOrEmail = useMemo(() => {
    return inviteeEmail || expiredEmail || queryParams.prefillEmail || ''
  }, [expiredEmail, inviteeEmail, queryParams.prefillEmail])

  useEffect(() => {
    setFieldValue('email', prefilledUsernameOrEmail)
  }, [prefilledUsernameOrEmail, setFieldValue])

  const loading = useMemo(() => isLoading || isSuccess, [isLoading, isSuccess])

  const disabled = useMemo(() => !isValid, [isValid])

  const handleSubmit = useCallback(() => {
    authenticateUser({
      usernameOrEmail: values.email,
      password: forceTrim(values.password),
    })
    setSubmitting(false)
  }, [authenticateUser, setSubmitting, values])

  const state = { disabled, loading, ...queryParams }
  const actions = { handleSubmit, switchToRegister }
  return [state, actions]
}

export default useLogin
