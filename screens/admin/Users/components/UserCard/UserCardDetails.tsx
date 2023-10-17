import ArrowDownIcon from '@assets/icons/arrows/arrow-down-small.svg'
import { UserCardDetailsProps } from '@screens/admin/Users/components/UserCard/UserCard.model'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'

const UserCardDetails: FC<UserCardDetailsProps> = ({
  onVisibilityChange,
  children,
  isAccess,
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.stopPropagation()
    setDetailsVisible((visible) => !visible)
  }

  useEffect(() => {
    onVisibilityChange?.(detailsVisible)
  }, [detailsVisible])

  return (
    <div>
      <div
        className={classNames(
          'flex items-center justify-start pt-[16px] cursor-pointer select-none transition-all desktop:hidden',
          {
            'pb-[16px]': !detailsVisible,
            '!pt-[15px]': isAccess,
          }
        )}
        onClick={toggleVisibility}
      >
        <span
          className={classNames(
            'font-semibold text-s-sm pl-[15px] transition-all',
            {
              'text-blue-1': !detailsVisible,
              'text-primary ': detailsVisible,
            }
          )}
        >
          {!detailsVisible ? 'Show Details' : 'Close Details'}
        </span>
        <ArrowDownIcon
          className={classNames('ml-[10px] transition-all', {
            'stroke-blue-1': !detailsVisible,
            'stroke-primary rotate-180': detailsVisible,
          })}
        />
      </div>

      {detailsVisible && children}
    </div>
  )
}

export default UserCardDetails
