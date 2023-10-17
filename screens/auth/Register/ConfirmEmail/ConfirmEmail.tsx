import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import OpenEnvelopeIcon from '@assets/icons/large-icons/open-envelope.svg'
import OpenEnvelopeBigIcon from '@assets/icons/large-icons/open-envelope-big.svg'
import { ROUTES } from '@constants/routes'
import authenticationApi from '@api/authentication'
import Spinner from '@components/Spinner/Spinner'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

interface IConfirmEmailProps {
  userEmail: string
}

const ConfirmEmail: React.FC<IConfirmEmailProps> = ({ userEmail }) => {
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const [requestSent, setRequestSent] = useState<boolean>(false)
  const [reSendConfirmationEmail, { isSuccess, isError, error }] =
    authenticationApi.endpoints.reSendConfirmationEmail.useMutation()

  const toggleRequestSent = () => setRequestSent((prevState) => !prevState)

  useEffect(() => {
    if (isSuccess) {
      toast.success('Confirmation email resent')
      toggleRequestSent()
      setTimeout(toggleRequestSent, 30 * 1000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError && error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.data?.message)
    }
  }, [isError, error])

  const handleReSendConfirmationEmail = useCallback(
    () => reSendConfirmationEmail({ email: userEmail }),
    [reSendConfirmationEmail, userEmail]
  )

  return (
    <div
      className={cn('flex flex-col items-center', {
        'pt-[84px]': isDesktop,
        'py-4 my-auto': !isDesktop,
      })}
    >
      <div
        className={cn({
          'mb-[55px]': isDesktop,
          'mb-[36px]': !isDesktop,
        })}
      >
        {isDesktop ? (
          <OpenEnvelopeBigIcon />
        ) : (
          <OpenEnvelopeIcon className="w-[127px]" />
        )}
      </div>
      <div className="font-semibold mb-[4px] text-[24px] leading-9">
        Success!
      </div>
      <div className="font-semibold mb-[23px] text-s-lg">
        Please confirm your email.
      </div>
      <div className="mx-6 text-center text-blue-1">
        Please check your email and click the link to
      </div>
      <div className="mx-6 text-center mb-[20px] text-blue-1">
        to complete your registration.
      </div>
      <div className="w-screen px-6 font-semibold text-center truncate mb-[22px] text-primary text-s-lg">
        {userEmail}
      </div>
      <div className="px-6 text-center text-blue-1 text-s-base">
        after receiving the email follow the link
      </div>
      <div
        className={cn('px-6 text-center text-blue-1 text-s-base', {
          'mb-[55px]': isDesktop,
          'mb-[89px]': !isDesktop,
        })}
      >
        provided to confirm your email
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <Button
          className="mb-[20px] text-s-lg max-w-[343px]"
          mode={ButtonMode.FULL_PRIMARY}
          onClick={() => router.push({ pathname: ROUTES.HOME })}
        >
          Close
        </Button>
        <div className="relative text-center text-s-lg">
          <div className="mb-[11px] text-blue-1">
            Did not receive the email?
          </div>
          <div
            className={cn('font-semibold', {
              'text-blue-1': requestSent,
              'cursor-pointer text-primary': !requestSent,
            })}
            onClick={handleReSendConfirmationEmail}
          >
            Resend Confirmation Email
          </div>
          {requestSent && <Spinner wrapperClassName="absolute pb-4" />}
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail
