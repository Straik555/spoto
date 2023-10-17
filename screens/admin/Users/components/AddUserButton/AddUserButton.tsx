import Button from '@components/Button'
import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import { AddUserButtonProps } from '@screens/admin/Users/components/AddUserButton/AddUserButton.model'
import React, { FC } from 'react'

const AddUserButton: FC<AddUserButtonProps> = ({ onClick, label }) => (
  <div className="w-full px-[16px] desktop:p-0 desktop:flex desktop:justify-end desktop:item-center">
    <Button
      onClick={onClick}
      mode={ButtonMode.FULL_PRIMARY}
      icon={ButtonIcon.ADD}
      className="font-semibold rounded-[5px] text-s-lg h-[44px] w-full p-0 mb-0 desktop:py-[20px] desktop:h-[50px] desktop:w-[169px] desktop:px-0 desktop:mb-[25px]"
      iconClassName="mr-[13px]"
    >
      {label}
    </Button>
  </div>
)

export default AddUserButton
