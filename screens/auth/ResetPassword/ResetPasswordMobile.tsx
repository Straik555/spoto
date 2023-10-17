import React, { useCallback, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import PasswordInput from '@components/Form/Input/PasswordInput'
import { ResetForm } from '@constants/types'
import { ROUTES } from '@constants/routes'
import LockIcon from '@assets/icons/large-icons/lock.svg'
import LockBigIcon from '@assets/icons/large-icons/lock-big.svg'
import FakePasswordIcon from '@assets/icons/large-icons/fake-password.svg'
import FakePasswordBigIcon from '@assets/icons/large-icons/fake-password-big.svg'
import { profileApi } from '@api/profile'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

import { RESET_PASSWORD_VALIDATION_SCHEMA } from './validation'
import { ResetPasswordQueryParams } from './ResetPassword.model'

const initialFormData: ResetForm = {
  newPassword: '',
  confirmNewPassword: '',
}

const ResetPasswordMobile: React.FC = () => {
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const [setNewProfilePassword, { error, isSuccess, isError, isLoading }] =
    profileApi.endpoints.setNewProfilePassword.useMutation()

  useEffect(() => {
    const { isReady, query } = router
    const { email, token } = query as ResetPasswordQueryParams

    const hasQueryParams = !!token && !!email

    if (isReady && !hasQueryParams) {
      router.push({ pathname: ROUTES.HOME })
    }
  }, [router])

  const handleSubmit = useCallback(
    async ({ newPassword }, { setSubmitting }): Promise<void> => {
      const { email: userEmail, token } =
        router.query as ResetPasswordQueryParams
      setNewProfilePassword({
        token,
        userEmail,
        newPassword,
      })
      setSubmitting(false)
    },
    [router.query, setNewProfilePassword]
  )

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.data.message || 'Failed to change password')
    }
  }, [error, isError])

  useEffect(() => {
    if (isSuccess) {
      router.push({ pathname: ROUTES.RESET_PASSWORD_SUCCESS })
    }
  }, [isSuccess, router])

  return (
    <div className="flex h-screen">
      <div
        className={cn('flex flex-col items-center w-full ', {
          'pt-[83px]': isDesktop,
          'my-auto p-[16px]': !isDesktop,
        })}
      >
        {isDesktop ? (
          <LockBigIcon className="mb-[25px]" />
        ) : (
          <LockIcon className="mb-[25px]" />
        )}
        {isDesktop ? (
          <FakePasswordBigIcon className="mb-[55px]" />
        ) : (
          <FakePasswordIcon className="mb-[60px]" />
        )}
        <div className="text-2xl font-semibold text-center mb-[10px]">
          Reset Password
        </div>
        <div className="font-normal text-center mb-[35px] text-s-xl text-blue-1">
          Type a new password below
        </div>
        <Formik
          initialValues={initialFormData}
          onSubmit={handleSubmit}
          validationSchema={RESET_PASSWORD_VALIDATION_SCHEMA}
        >
          {(props) => {
            const { isSubmitting, isValid } = props

            const disabled = !isValid || isSubmitting || isLoading

            return (
              <Form className="flex flex-col justify-between w-full min-h-[198px] max-w-[540px]">
                <div>
                  <PasswordInput
                    className="mb-[10px]"
                    name="newPassword"
                    placeholder="New Password"
                  />
                  <PasswordInput
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                  />
                </div>
                <Button
                  className="mx-auto mt-[8px] max-w-[343px]"
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
    </div>
  )
}

export default ResetPasswordMobile
