import Dropdown, {
  DropdownButton,
  DropdownItem,
  DropdownItems,
} from '@components/Dropdown/Dropdown'
import React, { FC, useState } from 'react'
import ThreeDotMenuIcon from '@assets/icons/three-dot-menu.svg'

export default {
  title: 'Reusable Components/Dropdown',
  component: Dropdown,
}

const Template: FC = ({ children }) => {
  return <div className="flex items-center justify-end w-full">{children}</div>
}

export const DropdownDefault = () => {
  const [isClick, setIsClick] = useState<boolean>(false)
  return (
    <Template>
      {isClick && <h3>Content</h3>}
      <div className="relative flex ml-10 border border-solid border-primary rounded-[5px]">
        <Dropdown
          action={
            <DropdownButton className="p-4">
              <ThreeDotMenuIcon className="fill-blue-1" />
            </DropdownButton>
          }
        >
          <DropdownItems className="mt-0 border top-3 right-3 border-blue-4 rounded-[5px] shadow-5">
            <DropdownItem
              onClick={() => setIsClick(!isClick)}
              disabled={isClick}
            >
              Edit Content
            </DropdownItem>
            <DropdownItem
              onClick={() => setIsClick(!isClick)}
              disabled={!isClick}
            >
              Delete Content
            </DropdownItem>
          </DropdownItems>
        </Dropdown>
      </div>
    </Template>
  )
}

export const DropdownElement = () => {
  return (
    <Template>
      <Dropdown
        action={
          <DropdownItem onClick={() => console.log('Open')}>Open</DropdownItem>
        }
      />
    </Template>
  )
}

export const DropdownElementDisabled = () => {
  return (
    <Template>
      <Dropdown
        action={
          <DropdownItem onClick={() => console.log('Open')} disabled>
            Disabled
          </DropdownItem>
        }
      />
    </Template>
  )
}

export const DropdownElements = () => {
  return (
    <Template>
      <Dropdown
        action={
          <>
            <DropdownItem onClick={() => console.log('Disabled')} disabled>
              Disabled
            </DropdownItem>
            <DropdownItem onClick={() => console.log('Open')}>
              Open
            </DropdownItem>
          </>
        }
      />
    </Template>
  )
}
