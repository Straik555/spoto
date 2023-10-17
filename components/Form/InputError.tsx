import React, { FC } from 'react'
import cn from 'classnames'

const InputError: FC<{ className?: string }> = ({ children, className }) => {
  return (
    <p
      role="alert"
      aria-label="input-error"
      className={cn('mt-2 text-s-sm text-red', className)}
    >
      {children}
    </p>
  )
}

export default InputError
