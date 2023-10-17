import React from 'react'
import { AuthenticateUserPayload } from '@api/authentication/types'

export type VerifyPhoneState = {
  confirmEmailIsLoading: boolean
  newPhone: string
  userData?: AuthenticateUserPayload
  verificationCode: boolean
  updatePhoneIsLoading: boolean
}

export type VerifyPhoneActions = {
  handleSubmit: (
    values: { phone: string },
    { setSubmitting: any }
  ) => Promise<void>

  setVerificationCode: React.Dispatch<React.SetStateAction<boolean>>
}

export type UseVerifyPhone = () => [VerifyPhoneState, VerifyPhoneActions]
