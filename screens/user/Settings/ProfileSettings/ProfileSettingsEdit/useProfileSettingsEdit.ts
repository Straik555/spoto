import { profileApi } from '@api/profile'
import { DEFAULT_PHONE_CODE } from '@components/Form/Input/PhoneInput/constants'

import { useCurrentProfile } from '@hooks/useCurrentProfile'
import { useTypedDispatch } from '@redux/hooks'
import { authSlice } from '@screens/auth/slice'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import {
  ProfileSettingsEditFormSubmit,
  ProfileSettingsEditFormValues,
  UseProfileSettingsEdit,
} from './ProfileSettingsEdit.model'

const useProfileSettingsEdit: UseProfileSettingsEdit = () => {
  const { profile, isFetching } = useCurrentProfile()
  const [updateProfile, { isSuccess, isError, isLoading }] =
    profileApi.endpoints.updateProfile.useMutation()
  const dispatch = useTypedDispatch()

  const handleSubmit: ProfileSettingsEditFormSubmit = async (
    values,
    { setSubmitting }
  ): Promise<void> => {
    const { firstName, lastName } = values
    await updateProfile({ firstName, lastName })

    if (profile?.email) {
      dispatch(
        authSlice.actions.changeProfile({
          email: profile.email,
          newProfileInfo: {
            firstName,
            lastName,
          },
        })
      )
    }
    setSubmitting(false)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile successfully updated!')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error('Failed to update profile')
    }
  }, [isError])

  const initialValues: ProfileSettingsEditFormValues = useMemo(() => {
    if (isFetching) {
      return {
        firstName: '',
        lastName: '',
        phone: DEFAULT_PHONE_CODE,
        email: '',
      }
    }

    const {
      email = '',
      firstName = '',
      lastName = '',
      phone = '',
    } = profile || {}

    return {
      firstName,
      lastName,
      email,
      phone: phone?.replace('+', ''),
    }
  }, [isFetching, profile])

  const state = {
    isFetching,
    isLoading,
    initialValues,
    profile,
  }
  const actions = { handleSubmit }
  return [state, actions]
}

export default useProfileSettingsEdit
