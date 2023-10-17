import { profileApi } from '@api/profile'
import CameraIcon from '@assets/icons/camera-18.svg'
import CameraBigIcon from '@assets/icons/camera-30.svg'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import FileUpload from '@components/FileUpload/FileUpload'
import Loader from '@components/Loader/Loader'
import { useTypedDispatch } from '@redux/hooks'
import UserAvatar from '@screens/admin/Users/components/UserAvatar/UserAvatar'
import { authSlice } from '@screens/auth/slice'
import cn from 'classnames'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

type ProfileAvatarSectionProps = {
  avatarUrl: string
  email: string
  isFetching: boolean
}

const ProfileAvatarSection: React.FC<ProfileAvatarSectionProps> = (props) => {
  const { avatarUrl, email, isFetching } = props
  const [updateProfilePhoto, { isSuccess, isError, isLoading }] =
    profileApi.endpoints.updateProfilePhoto.useMutation()
  const dispatch = useTypedDispatch()
  const { isDesktop } = useDeviceInfo()

  const handleUploadImage = (file) => {
    updateProfilePhoto(file)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile avatar successfully updated!')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccess && email) {
      dispatch(
        authSlice.actions.changeProfile({
          email,
          newProfileInfo: {
            photo: avatarUrl,
          },
        })
      )
    }
  }, [avatarUrl, dispatch, email, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error('Failed to update profile avatar')
    }
  }, [isError])

  return (
    <Loader
      loading={isLoading || isFetching}
      className="m-auto h-[200px] w-[200px]"
    >
      <div
        className={cn('relative', {
          'flex items-start justify-center min-h-[168px] bg-primary mt-[-1px]':
            !isDesktop,
        })}
      >
        <UserAvatar
          key={avatarUrl}
          className={cn({
            '!w-[250px] !h-[250px]': isDesktop,
            '!w-[150px] !h-[150px]': !isDesktop,
          })}
          thumbKey={avatarUrl}
        />

        <FileUpload
          disabled={isLoading}
          FileInputLabel={({ openFileUploadDialog }) => (
            <div
              className={cn(
                'absolute flex items-center justify-center bg-white rounded-[50%]',
                {
                  'top-[183px] left-[183px] w-[68px] h-[68px] shadow-md cursor-pointer':
                    isDesktop,
                  'top-[110px] left-[220px] w-[40px] h-[40px]': !isDesktop,
                }
              )}
              onClick={openFileUploadDialog}
            >
              {isDesktop ? (
                <CameraBigIcon className="fill-primary" />
              ) : (
                <CameraIcon className="fill-primary" />
              )}
            </div>
          )}
          updateFilesCb={handleUploadImage}
        />
      </div>
    </Loader>
  )
}

export default ProfileAvatarSection
