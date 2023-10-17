import React from 'react'

export type VerificationCodeState = {
  codeInputRef: React.MutableRefObject<null>
  isRunning: boolean
  timeLeft: string
  value: string
  values: Array<string>
}

export type HandleVerificationCodeChange = (value: string) => void
export type HandleVerificationCodeResend = () => void

export type VerificationCodeActions = {
  handleChange: HandleVerificationCodeChange
  handleResendCode: HandleVerificationCodeResend
}

export type UseVerificationCode = (
  newPhone: string
) => [VerificationCodeState, VerificationCodeActions]

export type VerificationCodeProps = {
  newPhone: string
  setVerificationCode: (value: boolean) => void
}

export type GetExpiryTimestamp = (props: { extraSeconds: number }) => Date
