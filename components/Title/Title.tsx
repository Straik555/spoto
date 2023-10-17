import { TitleProps } from '@components/Title/Title.model'
import classNames from 'classnames'
import { createElement, FC } from 'react'

const Title: FC<TitleProps> = ({
  as = 'h2',
  className,
  children,
  noCap,
  ...restProps
}) => {
  return createElement(
    as,
    {
      ...restProps,
      className: classNames(
        {
          capitalize: !noCap,
        },
        className
      ),
    },
    children
  )
}

export default Title
