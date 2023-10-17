import { ButtonMode } from '@components/Button/Button.model'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import Dialog from '@components/Dialog/Dialog'
import { Button } from '@components/index'
import { Loader } from '@components/Loader'
import cn from 'classnames'
import React, { FC } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { DatePickerDialogProps } from './DatePicker.model'

const DatePickerDialog: FC<DatePickerDialogProps> = ({
  onSubmit,
  loading,
  children,
  ...dialogProps
}) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <Dialog
      actions={
        <Button
          mode={isDesktop ? ButtonMode.FULL_PRIMARY : ButtonMode.SMALL}
          className={cn('w-full mt-[16px]', {
            '!py-[10px] text-s-lg': !isDesktop,
            'h-[50px]': isDesktop,
          })}
          onClick={() => onSubmit()}
        >
          Save
        </Button>
      }
      {...dialogProps}
      className={cn({
        'w-[580px] p-[30px_42px_40px]': isDesktop,
        'w-[343px] p-[15px]': !isDesktop,
      })}
      closeIcon
      titleClassName="mb-[16px]"
    >
      <Loader
        className="absolute top-0 left-0 w-full !bg-[#b5b5b5]/40 z-[99999]"
        loaderClassName="w-[132px]"
        loading={loading}
      />
      {children}
    </Dialog>
  )
}

export default DatePickerDialog
