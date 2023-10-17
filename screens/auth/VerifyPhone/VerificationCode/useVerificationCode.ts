import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useTimer } from 'react-timer-hook'
import { toast } from 'react-toastify'

import authenticationApi from '@api/authentication'
import { ROUTES } from '@constants/routes'
import { useDateUtil } from '@hooks/useDateUtil'

import {
  GetExpiryTimestamp,
  HandleVerificationCodeChange,
  UseVerificationCode,
} from './VerificationCode.model'

const getExpiryTimestamp: GetExpiryTimestamp = ({ extraSeconds }) => {
  const time = new Date()
  const seconds = time.getSeconds()

  time.setSeconds(seconds + extraSeconds || 0)
  return time
}

const CODE_ACTIVE_FOR_LIMIT = 120

const useVerificationCode: UseVerificationCode = (newPhone) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [
    updatePhone,
    { isSuccess: updatePhoneSuccess, isError: updatePhoneFailed },
  ] = authenticationApi.endpoints.updatePhone.useMutation()
  const [
    confirmPhone,
    { isSuccess: confirmPhoneSuccess, isError: confirmPhoneFailed },
  ] = authenticationApi.endpoints.confirmPhone.useMutation()
  const { isRunning, minutes, seconds, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp({
      extraSeconds: CODE_ACTIVE_FOR_LIMIT,
    }),
  })
  const router = useRouter()
  const codeInputRef = useRef(null)

  const dateUtil = useDateUtil()

  const values = useMemo(() => {
    return value.split('') as Array<string>
  }, [value])

  const handleSubmit = useCallback((): void => {
    confirmPhone({ confirmationCode: value })
  }, [confirmPhone, value])

  useEffect(() => {
    if (value.length === 6) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      codeInputRef?.current?.iRefs?.[0]?.current?.blur()
      handleSubmit()
    }
  }, [handleSubmit, value])

  const handleChange: HandleVerificationCodeChange = useCallback(
    (value) => {
      if (error) {
        setError('')
      }
      setValue(value)
    },
    [error]
  )

  const handleResendCode = useCallback((): void => {
    updatePhone({ newPhone })
  }, [newPhone, updatePhone])

  useEffect(() => {
    if (updatePhoneSuccess) {
      restart(getExpiryTimestamp({ extraSeconds: CODE_ACTIVE_FOR_LIMIT }))
    }
  }, [updatePhoneSuccess])

  useEffect(() => {
    if (updatePhoneFailed) {
      toast.error('Invalid phone number!')
    }
  }, [updatePhoneFailed])

  useEffect(() => {
    if (confirmPhoneSuccess) {
      router.push({ pathname: ROUTES.HOME })
    }
  }, [confirmPhoneSuccess, router])

  useEffect(() => {
    if (confirmPhoneFailed) {
      toast.error('Incorrect code please check again')
      setValue('')
    }
  }, [confirmPhoneFailed])

  const timeLeft = useMemo(() => {
    const minutesLeft = `${dateUtil().minute(minutes).format('m')} min`
    const secondsLeft = `${dateUtil().second(seconds).format('s')} sec`
    if (minutes && !seconds) {
      return minutesLeft
    }
    if (seconds && !minutes) {
      return secondsLeft
    }
    return `${minutesLeft} ${secondsLeft}`
  }, [dateUtil, minutes, seconds])

  const state = {
    codeInputRef,
    isRunning,
    timeLeft,
    value,
    values,
  }
  const actions = { handleChange, handleResendCode }

  return [state, actions]
}

export default useVerificationCode
