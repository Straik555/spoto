import React, { FC } from 'react'
import { UsersActionProps } from '@screens/admin/Users/components/UsersAction/UsersAction.model'
import cn from 'classnames'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'

const UsersAction: FC<UsersActionProps> = ({
  onDelete,
  onSave,
  isDisabled,
  deleteMessage,
  classNameWrapper,
  classNameButtonDelete,
  isButtonSaveVisible,
}) => {
  return (
    <div
      className={cn(
        'flex justify-end w-full p-[35px_13.65px_25px_0] desktop:p-0 desktop:w-max',
        classNameWrapper
      )}
    >
      {isButtonSaveVisible && (
        <Button
          className={cn(
            '!text-s-lg w-full h-[44px] desktop:w-[169px] desktop:h-[50px] desktop:px-[25px]',
            {
              '!bg-primary': isDisabled,
            }
          )}
          onClick={onSave}
          mode={ButtonMode.FULL_PRIMARY}
          disabled={isDisabled}
        >
          Save
        </Button>
      )}
      <Button
        className={cn(
          '!text-s-lg text-primary font-semibold w-full h-[44px] desktop:h-[50px] desktop:px-[25px]',
          classNameButtonDelete
        )}
        onClick={onDelete}
        mode={ButtonMode.FULL_SECONDARY}
      >
        {deleteMessage}
      </Button>
    </div>
  )
}

export default UsersAction
