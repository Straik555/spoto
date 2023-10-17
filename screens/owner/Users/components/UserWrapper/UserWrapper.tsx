import React, { FC } from 'react'
import { UserWrapperProps } from '@screens/owner/Users/components/UserWrapper/UserWrapper.model'
import Form from '@components/Form/Form'
import Input from '@components/Form/Input/Input'
import SearchIcon from '@assets/icons/search-15.svg'
import cn from 'classnames'

const UserWrapper: FC<UserWrapperProps> = ({
  children,
  search,
  onChange,
  buttonContent,
  className,
}) => {
  return (
    <div className="flex flex-col h-max grow justify-between mobile:overflow-y-auto desktop:overflow-visible">
      <Form
        initialValues={{ search }}
        className="mobile:px-[16px] mobile:my-[16px]"
      >
        <Input
          name="search"
          value={search}
          onChange={(e) => onChange(e.target.value)}
          prefixIcon={
            <SearchIcon className="fill-blue-3 desktop:fill-blue-1" />
          }
          inputClassName="pl-[36px] text-s-sm bg-blue-4 text-blue-3 font-semibold placeholder:text-blue-3 desktop:pl-[44px] desktop:text-s-lg desktop:bg-white desktop:font-normal"
          placeholder="Search"
        />
      </Form>

      <div
        className={cn(
          'flex flex-col pt-[16px] desktop:pb-0 desktop:pt-[25px] desktop:flex-wrap',
          className
        )}
      >
        {children}
      </div>
      {buttonContent}
    </div>
  )
}

export default UserWrapper
