import { ProfileInfo } from '@api/profile/types'

export type ProfileSettingsEditFormValues = Pick<
  ProfileInfo,
  'firstName' | 'lastName' | 'phone' | 'email'
>

export type ProfileSettingsEditState = {
  isFetching: boolean
  isLoading: boolean
  initialValues: ProfileSettingsEditFormValues
  profile?: ProfileInfo
}

export type ProfileSettingsEditFormSubmit = (
  values: ProfileSettingsEditFormValues,
  { setSubmitting: any }
) => Promise<void>

export type ProfileSettingsEditActions = {
  handleSubmit: ProfileSettingsEditFormSubmit
}

export type UseProfileSettingsEdit = () => [
  ProfileSettingsEditState,
  ProfileSettingsEditActions
]

export type ProfileSettingsEditDesktopProps = Omit<
  ProfileSettingsEditState,
  'isLoading'
>
