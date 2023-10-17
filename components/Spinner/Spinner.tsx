import React from 'react'
import cn from 'classnames'

import s from './Spinner.module.css'

const Spinner: React.FC<{ wrapperClassName?: string }> = ({
  wrapperClassName,
}) => (
  <div className={cn('w-full mx-auto', wrapperClassName)}>
    <div className={s.spinner} />
  </div>
)

export default Spinner
