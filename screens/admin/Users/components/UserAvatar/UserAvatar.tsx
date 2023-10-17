import SpotoDefaultThumbIcon from '@assets/icons/large-icons/spoto-default-logo.svg'
import Image from '@components/Image/Image'
import { UserAvatarProps } from '@screens/admin/Users/components/UserAvatar/UserAvatar.model'
import classNames from 'classnames'
import { FC } from 'react'

const UserAvatar: FC<UserAvatarProps> = ({
  thumbSrc,
  thumbKey,
  className,
  defaultAvatar,
}) => {
  const defaultClassNameImage = classNames(
    'inline-block rounded-full w-[50px] h-[50px] desktop:w-[68px] desktop:h-[68px] lg-desktop:w-[75px] lg-desktop:h-[75px]',
    className
  )
  return (
    <>
      {thumbSrc || thumbKey ? (
        <Image
          srcKey={thumbKey}
          src={thumbSrc}
          className={defaultClassNameImage}
          alt="Thumb Avatar"
        />
      ) : (
        defaultAvatar || (
          <SpotoDefaultThumbIcon
            className={classNames('fill-white', defaultClassNameImage)}
          />
        )
      )}
    </>
  )
}

export default UserAvatar
