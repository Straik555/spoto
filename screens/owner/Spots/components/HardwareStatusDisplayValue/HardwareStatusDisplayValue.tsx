import classNames from 'classnames'
import { createElement, FC } from 'react'

type HardwareStatusDisplayValueProps = {
  linked?: boolean
  as?: string
  className?: string
}

const HardwareStatusDisplayValue: FC<HardwareStatusDisplayValueProps> = ({
  as = 'span',
  linked,
  className,
  ...restProps
}) => {
  return createElement(
    as,
    {
      ...restProps,
      className: classNames(className, {
        'text-primary': linked,
        'text-blue-1': !linked,
      }),
    },
    <>{linked ? 'Linked' : 'Unlinked'}</>
  )
}

export default HardwareStatusDisplayValue
