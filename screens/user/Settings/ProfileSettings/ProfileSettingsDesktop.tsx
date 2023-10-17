import React, { useMemo } from 'react'
import { useFormikContext } from 'formik'
import { isEqual } from 'lodash'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { withForm } from '@components/Form/withForm'
import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'

import useProfileSettingsEdit from './ProfileSettingsEdit/useProfileSettingsEdit'
import { ProfileSettingsEditFormValues } from './ProfileSettingsEdit/ProfileSettingsEdit.model'
import ProfileSettingsWrapperDesktop from './components/ProfileSettingsWrapper'
import ProfileSettingsEditDesktop from './ProfileSettingsEdit/ProfileSettingsEditDesktop'
import { EDIT_PROFILE_VALIDATION_SCHEMA } from './validationSchema'

const ActionButtons = ({ disabled, handleClick }) => (
  <div className="flex">
    <Button
      disabled={disabled}
      onClick={handleClick}
      className="whitespace-nowrap my-[18px] !font-semibold"
      mode={ButtonMode.FULL_PRIMARY}
    >
      Update Profile
    </Button>
  </div>
)

const ProfileSettingsDesktop: React.FC = () => {
  const [state, actions] = useProfileSettingsEdit()
  const form = useFormikContext<ProfileSettingsEditFormValues>()
  const { isSubmitting, isValid, values } = form

  const { isFetching, isLoading, initialValues, profile } = state
  const { handleSubmit } = actions

  const disabled = useMemo(
    () =>
      isEqual(values, initialValues) || !isValid || isLoading || isSubmitting,
    [initialValues, isLoading, isSubmitting, isValid, values]
  )

  return (
    <ProfileSettingsWrapperDesktop
      headerTitle="Back"
      headerRightContent={
        <ActionButtons
          disabled={disabled}
          handleClick={() => handleSubmit(values, form)}
        />
      }
    >
      <ProfileSettingsEditDesktop {...{ isFetching, initialValues, profile }} />
    </ProfileSettingsWrapperDesktop>
  )
}

export default withForm(
  {
    initialValues: {
      firstName: '',
      lastName: '',
      phone: DEFAULT_PHONE_CODE,
      email: '',
    },
    enableReinitialize: true,
    isInitialValid: false,
    validationSchema: EDIT_PROFILE_VALIDATION_SCHEMA,
    className: 'h-full',
  },
  ProfileSettingsDesktop
)
