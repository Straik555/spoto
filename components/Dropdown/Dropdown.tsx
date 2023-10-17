import {
  DropdownButtonProps,
  DropdownItemProps,
  DropdownItemsProps,
  DropdownProps,
} from '@components/Dropdown/Dropdown.model'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { FC, Fragment } from 'react'

const Dropdown: FC<DropdownProps> = ({ action, children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {action}
      {children}
    </Menu>
  )
}

export const DropdownButton: FC<DropdownButtonProps> = ({
  className,
  children,
}) => {
  return (
    <Menu.Button
      className={classNames('flex items-center justify-end', className)}
    >
      <span className="sr-only">Open options</span>
      <div aria-hidden="true">{children}</div>
    </Menu.Button>
  )
}

export const DropdownItems: FC<DropdownItemsProps> = ({
  className,
  children,
}) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={classNames(
          'absolute right-0 top-0 w-56 bg-white shadow-lg origin-top-right rounded-[5px] ring-1 ring-black ring-opacity-5 focus:outline-none py-[10px]',
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  )
}

export const DropdownItem: FC<DropdownItemProps> = ({
  className,
  activeClassName = '',
  children,
  onClick,
  disabled,
}) => {
  return (
    <Menu.Item onClick={onClick} disabled={disabled}>
      {({ active }) => (
        <div
          className={classNames(
            {
              [activeClassName]: active,
              'text-blue-3': disabled,
              'text-blue-1': !disabled,
            },
            className,
            'block px-[15px] py-[5px] text-s-lg hover:bg-blue-4 cursor-pointer'
          )}
        >
          {children}
        </div>
      )}
    </Menu.Item>
  )
}

export default Dropdown
