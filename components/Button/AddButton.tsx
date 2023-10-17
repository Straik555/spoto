import React, { FC } from 'react'
import { AddButtonProps } from '@components/Button/Button.model'

const AddButton: FC<AddButtonProps> = ({ children, title, onClick }) => {
  return (
    <div onClick={onClick} className="mt-5">
      {title && <span className="mb-1 text-xs text-blue-1">{title}</span>}
      <div className="flex items-center justify-center w-full py-5 text-xs border-2 border-dashed rounded text-primary border-blue-1 px-[5px]">
        {children}
      </div>
    </div>
  )
}

export default AddButton
