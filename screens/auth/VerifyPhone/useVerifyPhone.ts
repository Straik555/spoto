import authenticationApi from '@api/authentication'
import { ConfirmEmailParams } from '@api/authentication/types'
import { ROUTES } from '@constants/routes'
import { useTypedDispatch } from '@redux/hooks'
import { authSlice } from '@screens/auth/slice'
import { UseVerifyPhone } from '@screens/auth/VerifyPhone/VerifyPhone.model'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useVerifyPhone: UseVerifyPhone = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const [
    confirmEmail,
    {
      data: userData,
      isError: confirmEmailFailed,
      isSuccess: confirmEmailSuccess,
      isLoading: confirmEmailIsLoading,
    },
  ] = authenticationApi.endpoints.confirmEmail.useMutation()
  const [
    updatePhone,
    {
      isSuccess: updatePhoneSuccess,
      isError: updatePhoneFailed,
      isLoading: updatePhoneIsLoading,
    },
  ] = authenticationApi.endpoints.updatePhone.useMutation()
  const [verificationCode, setVerificationCode] = useState<boolean>(false)
  const [newPhone, setNewPhone] = useState<string>('')

  useEffect(() => {
    if (confirmEmailSuccess && userData) {
      const {
        email,
        expiration,
        firstName,
        lastName,
        photo,
        roles,
        token,
        title,
      } = userData
      dispatch(
        authSlice.actions.addProfile({
          email,
          expiration,
          firstName,
          lastName,
          roles,
          token,
          photo: photo ? photo : '',
          title,
        })
      )
      dispatch(authSlice.actions.setToken(token))
    }
  }, [confirmEmailSuccess, dispatch, userData])

  useEffect(() => {
    if (confirmEmailFailed) {
      toast.error('Email confirmation failed!')
    }
  }, [confirmEmailFailed])

  useEffect(() => {
    if (updatePhoneSuccess) {
      setVerificationCode(true)
    }
  }, [updatePhoneSuccess])

  useEffect(() => {
    if (updatePhoneFailed) {
      toast.error('Invalid phone number!')
    }
  }, [updatePhoneFailed])

  useEffect(() => {
    const { isReady, query } = router

    if (isReady) {
      const { confirmationCode } = query as ConfirmEmailParams

      if (confirmationCode) {
        confirmEmail({ confirmationCode })
      } else {
        router.push({ pathname: ROUTES.HOME })
      }
    }
  }, [confirmEmail, router])

  const handleSubmit = async (values, { setSubmitting }): Promise<void> => {
    const { phone } = values

    const newPhoneWithPlus = `+${phone}`

    await updatePhone({ newPhone: newPhoneWithPlus })
    setNewPhone(newPhoneWithPlus)
    setSubmitting(false)
  }

  const state = {
    confirmEmailIsLoading,
    newPhone,
    userData,
    verificationCode,
    updatePhoneIsLoading,
  }
  const actions = { handleSubmit, setVerificationCode }

  return [state, actions]
}

export default useVerifyPhone
