import React, { FC } from 'react'
import Dialog from '@components/Dialog/Dialog'
import { ButtonMode } from '@components/Button/Button.model'
import { Button } from '@components/index'
import { VisitorsParkingCancelProps } from '@screens/user/MyVisitors/VisitorsParkingCancel/VisitorsParkingCancel.model'
import Close from '@assets/icons/close-24.svg'
import Cancel from '@assets/icons/large-icons/cancel-128.svg'

const VisitorsParkingCancel: FC<VisitorsParkingCancelProps> = ({
  isOpen,
  onCancel,
  onBack,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onBack}
      className="w-[343px] !pt-[30px] !rounded-[10px]"
    >
      <div
        className="absolute cursor-pointer right-[8px] top-[8px]"
        onClick={onBack}
      >
        <Close className="fill-blue-3" />
      </div>
      <div className="flex flex-col w-full justify-center items-center pt-[2px] pl-[2px]">
        <Cancel />
        <p className="!text-s-xl font-semibold mb-[30px] mt-[32px]">
          Cancel this booking?
        </p>
      </div>
      <div className="flex justify-between">
        <Button
          mode={ButtonMode.FULL_SECONDARY}
          className="!text-s-lg !font-semibold !border !border-2 !border-solid !border-primary !w-[149px] h-[44px] text-primary"
          type="button"
          onClick={onBack}
        >
          Close
        </Button>
        <Button
          mode={ButtonMode.FULL_PRIMARY}
          className="!text-s-lg !font-semibold !w-[149px] h-[44px]"
          type="button"
          onClick={onCancel}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}

export default VisitorsParkingCancel
