import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

import CircleCheckmarkIcon from '@assets/icons/circle-icons/expand-green-circle-24.svg'
import CircleXmarkIcon from '@assets/icons/circle-icons/close-red-circle-24.svg'
import PhoneInput from '@components/Form/Input/PhoneInput/PhoneInput'
import Input from '@components/Form/Input/Input'
import { InputTypes } from '@components/Form/Input/Input.model'

import ProfileAvatarSection from '../components/ProfileAvatarSection'
import {
  ProfileSettingsEditDesktopProps,
  ProfileSettingsEditFormValues,
} from './ProfileSettingsEdit.model'

const ConfirmationStatusIcon: React.FC<{
  confirmed?: boolean
}> = ({ confirmed }) =>
  confirmed ? (
    <CircleCheckmarkIcon className="mt-auto mb-2 ml-6" />
  ) : (
    <CircleXmarkIcon className="mt-auto mb-2 ml-6" />
  )

const ProfileSettingsEditDesktop: React.FC<ProfileSettingsEditDesktopProps> = ({
  isFetching,
  initialValues,
  profile,
}) => {
  const form = useFormikContext<ProfileSettingsEditFormValues>()

  const {
    avatarUrl = '',
    email = '',
    isEmailConfirmed,
    isPhoneConfirmed,
  } = profile || {}

  useEffect(() => {
    if (!isFetching) {
      form.setValues(initialValues)
    }
  }, [isFetching])

  return (
    <div className="flex py-[35px] px-[75px]">
      <ProfileAvatarSection {...{ avatarUrl, email, isFetching }} />
      <div className="flex-1 ml-[100px]">
        <div className="flex flex-wrap w-full mb-9">
          <Input<ProfileSettingsEditFormValues>
            className="flex-1 mr-6 min-w-[250px]"
            label="First name"
            name="firstName"
            placeholder="First name"
          />
          <Input<ProfileSettingsEditFormValues>
            className="flex-1 min-w-[250px]"
            label="Last name"
            name="lastName"
            placeholder="Last name"
          />
        </div>
        <div className="flex flex-wrap w-full">
          <div className="flex flex-1 w-full mr-6 min-w-[250px]">
            <Input<ProfileSettingsEditFormValues>
              disabled
              className="w-[calc(100%-50px)]"
              type={InputTypes.EMAIL}
              label="Email"
              name="email"
              placeholder="Email address"
            />
            <ConfirmationStatusIcon confirmed={isEmailConfirmed} />
          </div>

          <div className="flex flex-1 w-full min-w-[250px]">
            <PhoneInput
              wrapperClassName="w-[calc(100%-50px)]"
              inputClassName="!w-[calc(100%-72px)]"
              containerClassName="!w-[calc(100%-22px)]"
              name="phone"
              disabled
              label="Phone"
            />
            <ConfirmationStatusIcon confirmed={isPhoneConfirmed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsEditDesktop
