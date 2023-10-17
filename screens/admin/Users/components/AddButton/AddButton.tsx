import { Button } from '@components/index'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import React, { FC } from 'react'
import { AddButtonProps } from '@screens/admin/Users/components/AddButton/AddButton.model'

const AddButton: FC<AddButtonProps> = ({ title, onOpen }) => {
  return (
    <div className="flex justify-center w-full p-[16px] desktop:justify-end desktop:p-0">
      <Button
        className="w-full capitalize desktop:h-[50px] desktop:w-[209px] desktop:p-[0_25px_0_27px]"
        onClick={onOpen}
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.ADD_WHITE}
      >
        {title}
      </Button>
    </div>
  )
}

export default AddButton
