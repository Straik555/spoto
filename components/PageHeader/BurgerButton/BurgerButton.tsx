import React from 'react'
import classNames from 'classnames'

import { PageHeaderView } from '@components/PageHeader/PageHeader.model'
import BurgerButtonIcon from '@assets/icons/burger-button.svg'

const BurgerButton: React.FC<{
  isOpen
  setIsOpen
  view?: PageHeaderView
}> = ({ isOpen, setIsOpen, view = PageHeaderView.default }) => {
  return (
    <button
      className={classNames(
        `flex flex-col items-center justify-center border-0 group`,
        {
          'w-[41px] h-[41px] bg-white shadow-lg rounded-md flex justify-center items-center':
            view === PageHeaderView.white,
        }
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="sidebar-menu-icon"
    >
      <BurgerButtonIcon
        className={classNames({
          'fill-white': view === PageHeaderView.default,
          'fill-blue-1': view === PageHeaderView.white,
        })}
      />
    </button>
  )
}

export default React.memo(BurgerButton)
