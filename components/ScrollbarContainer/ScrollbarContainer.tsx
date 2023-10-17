import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import { ScrollbarContainerProps } from '@components/ScrollbarContainer/ScrollbarContainer.model'
import classNames from 'classnames'
import { createElement, FC } from 'react'

const ScrollbarContainer: FC<ScrollbarContainerProps> = ({
  children,
  className,
  ...restProps
}) => {
  const { isDesktop } = useDeviceInfo()

  return createElement(
    'div',
    {
      ...restProps,
      className: classNames(
        {
          'mobile-scrollbar': !isDesktop,
        },
        className
      ),
    },
    children
  )
}

export default ScrollbarContainer
