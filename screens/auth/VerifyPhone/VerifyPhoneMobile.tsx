import { Form, Formik } from 'formik'
import React from 'react'
import cn from 'classnames'

import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import PhoneInput from '@components/Form/Input/PhoneInput/PhoneInput'
import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'
import Title from '@components/Title/Title'
import Loader from '@components/Loader/Loader'

import useVerifyPhone from './useVerifyPhone'
import VerificationCode from './VerificationCode/VerificationCode'
import { VERIFY_PHONE_VALIDATION_SCHEMA } from './validation'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const VerifyPhoneMobile: React.FC = () => {
  const { isDesktop } = useDeviceInfo()
  const [state, actions] = useVerifyPhone()
  const {
    confirmEmailIsLoading,
    newPhone,
    userData,
    verificationCode,
    updatePhoneIsLoading,
  } = state
  const { handleSubmit, setVerificationCode } = actions

  if (verificationCode) {
    return <VerificationCode {...{ newPhone, setVerificationCode }} />
  }

  return (
    <Loader loading={confirmEmailIsLoading}>
      <div className="flex flex-col items-center h-full px-[16px]">
        <Title
          as="div"
          className="font-semibold uppercase text-[28px] leading-[42px] mb-[10px] mt-[150px]"
        >
          Verify phone number
        </Title>
        <div className="text-center px-[8px] text-s-xl text-blue-1">
          Please select your country and
        </div>
        <div className="text-center px-[8px] text-s-xl text-blue-1 mb-[50px]">
          enter your mobile number
        </div>

        <Formik
          initialValues={{
            phone:
              (newPhone || userData?.phone)?.replace('+', '') ||
              DEFAULT_PHONE_CODE,
          }}
          onSubmit={handleSubmit}
          validationSchema={VERIFY_PHONE_VALIDATION_SCHEMA}
          enableReinitialize
          validateOnMount={Boolean(userData)}
        >
          {(props) => {
            const { isValid } = props

            const disabled = !isValid || updatePhoneIsLoading

            return (
              <Form
                className={cn(
                  'flex flex-col items-center w-full max-w-[540px]',
                  {
                    'min-h-[123px]': isDesktop,
                    'min-h-[145px]': !isDesktop,
                  }
                )}
              >
                <PhoneInput wrapperClassName="!mt-0 w-full" name="phone" />
                <Button
                  className="mx-auto mt-auto max-w-[343px]"
                  type="submit"
                  disabled={disabled}
                  mode={ButtonMode.FULL_PRIMARY}
                >
                  Confirm
                </Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Loader>
  )
}

export default VerifyPhoneMobile
