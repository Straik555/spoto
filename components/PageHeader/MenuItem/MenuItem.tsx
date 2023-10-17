import React, { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import { MenuItemProps } from '@components/PageHeader/MenuItem/MenuItem.model'
import { Url } from '@constants/routes'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const MenuItemWrapper: FC<{ pageRoute?: Url }> = ({ children, pageRoute }) =>
  pageRoute ? (
    <Link href={pageRoute}>
      <a>{children}</a>
    </Link>
  ) : (
    <>{children}</>
  )

const MenuItem: FC<MenuItemProps> = ({
  title,
  icon,
  onClick,
  pageRoute,
  active,
}) => {
  const { isDesktop } = useDeviceInfo()

  const StyledChildren = () =>
    React.Children.map(icon, (child) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return React.cloneElement(child, {
        className: cn('fill-blue-3 group-hover:fill-primary', {
          '!fill-primary': active,
        }),
      })
    })

  return (
    <MenuItemWrapper pageRoute={pageRoute}>
      <div className={cn({ 'border-l-[5px] border-l-primary': active })}>
        <div
          className={cn(
            'group flex items-center flex text-s-xl font-medium py-[15px] cursor-pointer items-center whitespace-nowrap text-blue-3 border-b border-solid border-blue-4 hover:text-primary',
            {
              '!text-primary ml-[11px]': active && isDesktop,
              '!text-primary ml-[6px]': active && !isDesktop,
              'h-[68px] mx-[16px]': isDesktop,
              'h-[58px] mx-[11px]': !isDesktop,
            }
          )}
          onClick={onClick}
        >
          <div className="flex items-center justify-center h-full w-[31px] min-w-[31px]">
            {StyledChildren()}
          </div>
          <p className="m-0 ml-[12px] overflow-x-hidden">{title}</p>
        </div>
      </div>
    </MenuItemWrapper>
  )
}

export default React.memo(MenuItem)
