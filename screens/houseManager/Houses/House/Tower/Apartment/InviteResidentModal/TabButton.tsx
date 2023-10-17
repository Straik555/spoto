import React from 'react'
import cn from 'classnames'
import { TabButtonProps } from './InviteResidentModal.model'

const TabButton: React.FC<TabButtonProps> = ({
  children,
  isActive,
  onClick,
}) => (
  <button
    onClick={() => {
      if (!isActive) {
        onClick()
      }
    }}
    className={cn('w-1/2 px-4 pb-2 m-0 text-center border-b-2', {
      'text-blue-2 text-s-sm': !isActive,
      'text-primary border-primary font-semibold': isActive,
    })}
  >
    {children}
  </button>
)

export default TabButton
