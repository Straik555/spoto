import { InputLabelProps } from '@components/Form/Form.model'
import Title from '@components/Title/Title'
import cn from 'classnames'
import React, { FC } from 'react'

const InputLabel: FC<InputLabelProps> = ({
  noCap = false,
  className,
  children,
  ...titleProps
}) => {
  return (
    <Title
      as="span"
      noCap={noCap}
      className={cn(
        'block mb-[5px] font-normal text-s-base text-blue-1 ',
        className
      )}
      {...titleProps}
    >
      {children}
    </Title>
  )
}

export default InputLabel
