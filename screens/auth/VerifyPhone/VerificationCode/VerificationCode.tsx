import cn from 'classnames'
import ReactVerificationCodeInput from 'react-verification-code-input'
import React from 'react'
import _noop from 'lodash/noop'

import Title from '@components/Title/Title'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import s from './VerificationCode.module.css'
import useVerificationCode from './useVerificationCode'
import { VerificationCodeProps } from './VerificationCode.model'

const VerificationCode: React.FC<VerificationCodeProps> = (props) => {
  const { newPhone, setVerificationCode } = props
  const { isDesktop } = useDeviceInfo()
  const [state, actions] = useVerificationCode(newPhone)
  const { codeInputRef, isRunning, timeLeft, value, values } = state
  const { handleChange, handleResendCode } = actions

  return (
    <div className="flex flex-col items-center h-full pt-[150px] pb-[87px]">
      <Title
        as="div"
        className={cn('font-semibold text-[28px] leading-[42px]', {
          'mb-[15px]': isDesktop,
          'mb-[10px]': !isDesktop,
        })}
      >
        Verification code
      </Title>
      <div
        className={cn('text-center text-s-xl text-blue-1', {
          'mb-[10px]': isDesktop,
        })}
      >
        Please enter code sent to
      </div>
      <div
        className={cn('font-semibold text-center text-s-xl text-primary', {
          'mb-[10px]': isDesktop,
        })}
      >
        {newPhone}
      </div>
      {isRunning ? (
        <>
          <div
            className={cn('text-s-xl text-blue-1', {
              'mb-[10px]': isDesktop,
            })}
          >
            Code active for
          </div>
          <div
            className={cn('mb-8 text-s-xl text-red', {
              'mb-[25px]': isDesktop,
            })}
          >
            {timeLeft}
          </div>
        </>
      ) : (
        <span className="text-s-xl text-red mb-[58px]">
          Your code has expired
        </span>
      )}
      <ReactVerificationCodeInput
        ref={codeInputRef}
        fieldWidth={40}
        fieldHeight={31}
        className={cn(
          '!w-[280px]',
          { 'mb-[60px]': isDesktop, 'mb-[50px]': !isDesktop },
          s.reactVerificationCodeInput
        )}
        key={value}
        values={values}
        onChange={handleChange}
      />
      <Title
        as="div"
        className={cn('font-semibold text-s-lg', {
          'text-blue-2': isRunning,
          'text-primary cursor-pointer': !isRunning,
          'mb-[115px]': isDesktop,
        })}
        onClick={isRunning ? _noop : handleResendCode}
      >
        Resend code
      </Title>

      <div
        className={cn('mb-[11px] text-blue-1 text-s-lg', {
          'mt-auto': !isDesktop,
        })}
      >
        Entered an incorrect mobile number?
      </div>
      <div
        className="text-base font-semibold cursor-pointer text-s-lg text-primary"
        onClick={() => setVerificationCode(false)}
      >
        Re-enter Correct Number
      </div>
    </div>
  )
}

export default VerificationCode
