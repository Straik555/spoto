import React, { FC } from 'react'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import { DeleteDialogProps } from '@components/Dialog/Dialog.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import DeletingIcon128 from '@assets/icons/large-icons/trash-is-delete-128.svg'
import DeletingIcon202 from '@assets/icons/large-icons/trash-is-delete-202.svg'
import CloseIcon from '@assets/icons/close-14.svg'
import cn from 'classnames'

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onClose,
  message,
  onSubmit,
  disabled,
  className,
  classNameButton,
  classNameMessage,
  confirmTitle,
}) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={cn(
        'relative h-min pt-[30px] !rounded-[10px] desktop:pt-[50px]',
        className
      )}
    >
      <div className="h-full">
        <CloseIcon
          className="absolute fill-blue-2 cursor-pointer -top-[-15px] -right-[-15px] desktop:-top-[-20px] desktop:-right-[-20px]"
          onClick={onClose}
        />
        {isDesktop ? (
          <DeletingIcon202 className="m-auto" />
        ) : (
          <DeletingIcon128 className="m-auto" />
        )}
        <div
          className={cn(
            'font-semibold text-center text-black text-s-xl mt-[30px] desktop:mt-[50px]',
            classNameMessage
          )}
        >
          {message}
        </div>
        <div className="grid grid-cols-2 gap-x-[11px] mt-[16px] desktop:mt-[35px]">
          <Button
            mode={ButtonMode.FULL_SECONDARY}
            onClick={onClose}
            className={cn(
              'text-s-lg border-2 !font-semibold border-primary text-primary !p-0 h-[44px]',
              classNameButton
            )}
          >
            Cancel
          </Button>
          <Button
            mode={ButtonMode.FULL_PRIMARY}
            onClick={() => onSubmit?.()}
            className={cn(
              'text-s-lg !font-semibold !p-0 h-[44px]',
              classNameButton
            )}
            disabled={disabled}
          >
            {confirmTitle || 'Delete'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteDialog
