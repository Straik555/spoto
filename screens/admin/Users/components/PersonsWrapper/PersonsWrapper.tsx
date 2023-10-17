import React, { FC } from 'react'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import cn from 'classnames'
import Form from '@components/Form/Form'
import Input from '@components/Form/Input/Input'
import SearchIcon from '@assets/icons/search-15.svg'
import { PersonWrapperProps } from '@screens/admin/Users/components/PersonsWrapper/PersonWrapper.model'

const PersonsWrapper: FC<PersonWrapperProps> = ({
  children,
  onChangeSearch,
  search,
  buttonContent,
  className,
}) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <div className="flex flex-col justify-between h-max grow  mobile:overflow-y-auto desktop:overflow-visible mobile:px-[16px] desktop:px-0 mb-[76px] desktop:mb-0">
      {isDesktop && buttonContent}
      <div className="flex flex-col h-full">
        <Form
          initialValues={{ search }}
          className="mb-[16px] desktop:mb-[25px]"
        >
          <Input
            name="search"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            prefixIcon={
              <SearchIcon className="fill-blue-3 desktop:fill-blue-1" />
            }
            inputClassName="pl-[36px] desktop:pl-[44px] text-s-sm bg-blue-4 text-blue-3 font-semibold placeholder:text-blue-3 desktop:text-s-lg desktop:bg-white desktop:font-normal"
            placeholder="Search"
          />
        </Form>

        <div
          className={cn(
            'flex flex-col desktop:pb-0 desktop:p-0 desktop:flex-wrap',
            className
          )}
        >
          {children}
        </div>
      </div>
      {!isDesktop && (
        <div className="fixed bottom-0 left-0 w-full bg-white">
          {buttonContent}
        </div>
      )}
    </div>
  )
}

export default PersonsWrapper
