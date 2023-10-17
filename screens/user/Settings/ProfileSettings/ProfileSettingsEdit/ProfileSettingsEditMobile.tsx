import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ButtonMode } from '@components/Button/Button.model'
import Input from '@components/Form/Input/Input'
import { InputTypes } from '@components/Form/Input/Input.model'
import { Button } from '@components/index'
import PhoneInput from '@components/Form/Input/PhoneInput/PhoneInput'
import ProfilePageWrapper from '@components/ProfilePageWrapper/ProfilePageWrapper'
import { ROUTES } from '@constants/routes'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import CheckGreenIcon from '@assets/icons/circle-icons/check-green-circle-20.svg'
import CloseRedCircleIcon from '@assets/icons/circle-icons/close-red-circle-24.svg'

import ProfileAvatarSection from '../components/ProfileAvatarSection'
import { EDIT_PROFILE_VALIDATION_SCHEMA } from '../validationSchema'
import { ProfileSettingsEditFormValues } from './ProfileSettingsEdit.model'
import useProfileSettingsEdit from './useProfileSettingsEdit'

const ProfileSettingsEditMobile = () => {
  const [state, actions] = useProfileSettingsEdit()
  const router = useRouter()
  const { isDesktop } = useDeviceInfo()
  const { isFetching, isLoading, initialValues, profile } = state
  const { handleSubmit } = actions

  const {
    avatarUrl = '',
    email = '',
    isPhoneConfirmed,
    isEmailConfirmed,
  } = profile || {}

  useEffect(() => {
    if (isDesktop) {
      router.push(ROUTES.PROFILE_SETTINGS)
    }
  }, [isDesktop, router])

  return (
    <ProfilePageWrapper title="Back">
      <ProfileAvatarSection {...{ avatarUrl, email, isFetching }} />

      <div className="flex px-[16px] pb-[16px] grow">
        <Formik
          key={String(isFetching)}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isInitialValid={false}
          validationSchema={EDIT_PROFILE_VALIDATION_SCHEMA}
        >
          {(props) => {
            const { isSubmitting, isValid } = props

            const disabled = !isValid || isSubmitting || isLoading

            return (
              <Form className="flex flex-col justify-between w-full h-full">
                <div>
                  <Input<ProfileSettingsEditFormValues>
                    className="!w-[calc(100%-25px)]"
                    label="First name"
                    name="firstName"
                    placeholder="First name"
                  />
                  <Input<ProfileSettingsEditFormValues>
                    className="!w-[calc(100%-25px)]"
                    label="Last name"
                    name="lastName"
                    placeholder="Last name"
                  />
                  <Input<ProfileSettingsEditFormValues>
                    disabled
                    type={InputTypes.EMAIL}
                    label="Email"
                    name="email"
                    placeholder="Email address"
                    trailingIcon={
                      isEmailConfirmed ? (
                        <CheckGreenIcon />
                      ) : (
                        <CloseRedCircleIcon className="scale-[0.85]" />
                      )
                    }
                    trailingIconClassName="right-[-25px]"
                    containerClassName="!w-[calc(100%-25px)]"
                  />
                  <PhoneInput<ProfileSettingsEditFormValues>
                    disabled
                    inputClassName="h-[44px] !w-[calc(100%-95px)]"
                    label="Phone"
                    name="phone"
                    trailingIcon={
                      isPhoneConfirmed ? (
                        <CheckGreenIcon />
                      ) : (
                        <CloseRedCircleIcon className="scale-[0.85]" />
                      )
                    }
                    trailingIconClassName="right-[-25px]"
                    inputContainerClassName="!w-[calc(100%-25px)]"
                    hideFieldError
                  />
                </div>
                <Button
                  type="submit"
                  disabled={disabled}
                  className="mt-[16px]"
                  mode={ButtonMode.FULL_PRIMARY}
                >
                  Update Profile
                </Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </ProfilePageWrapper>
  )
}

export default ProfileSettingsEditMobile
