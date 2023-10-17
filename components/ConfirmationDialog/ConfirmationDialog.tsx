import React from 'react'
import cn from 'classnames'
import CloseIcon from '@assets/icons/close-20.svg'
import Button from '@components/Button/Button'
import { ButtonMode } from '@components/Button/Button.model'
import { ConfirmationDialogProps } from './ConfirmationDialog.model'
import Dialog from '@components/Dialog/Dialog'

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  children,
  title,
  titleIcon,
  onClose,
  onApply,
  applyText,
  cancelText,
  titleClassName,
  titleContainerClassName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative p-[16px] !pt-[30px] !rounded-[10px]"
    >
      <div
        className={cn(
          'text-base font-semibold text-center mt-[23px] flex flex-col items-center mb-[16px]',
          titleContainerClassName
        )}
      >
        {titleIcon}
        <span className={cn('text-s-xl', titleClassName)}>{title}</span>
      </div>
      <span className="absolute cursor-pointer top-4 right-4">
        <CloseIcon className="fill-blue-3" onClick={onClose} />
      </span>
      {!!children && (
        <div className="pl-1 pr-1 mb-12 text-sm text-center text-default">
          {children}
        </div>
      )}
      <div className="flex justify-stretch">
        {cancelText && (
          <Button
            mode={ButtonMode.FULL_SECONDARY}
            onClick={onClose}
            className="px-0 mr-4 font-semibold border-2 py-[8px] text-s-lg border-primary !text-primary"
          >
            {cancelText}
          </Button>
        )}
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          onClick={onApply}
          className="px-0 font-semibold py-[8px] text-s-lg"
        >
          {applyText}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmationDialog
