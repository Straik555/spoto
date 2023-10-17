import React, { FC, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Dialog from '@components/Dialog/Dialog'
import { SuccessDialogProps } from '@components/Dialog/Dialog.model'
import { Button } from '@components/index'
import { ButtonMode } from '@components/Button/Button.model'
import { useShareLink } from '@hooks/useShareLink'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import BookingSuccessfulImg from '@assets/icons/large-icons/booking-successful-color.svg'
import CloseSuccess from '@assets/icons/close-success.svg'
import Copy from '@assets/icons/copy-24.svg'
import Share from '@assets/icons/share.svg'

const SuccessDialog: FC<SuccessDialogProps> = ({
  buttonTitle,
  isOpen,
  closeModal,
  title,
  onSubmit,
  subTitle,
  link,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const { share } = useShareLink({ url: String(link) })
  const { isDesktop } = useDeviceInfo()

  useEffect(() => {
    if (isCopied) {
      setIsCopied(false)
      toast.success('The Link Has Been Copied')
    }
  }, [isCopied])

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="!rounded-[10px] w-[343px] !p-[16px]"
    >
      <div
        className="absolute cursor-pointer right-[10px] top-[10px]"
        onClick={() => closeModal()}
      >
        <CloseSuccess className="fill-blue-3" />
      </div>
      <div className="w-full flex justify-center mt-[34px] mb-[50px]">
        <BookingSuccessfulImg />
      </div>
      <p className="text-s-2xl font-semibold text-center mb-[16px]">{title}</p>
      <p className="px-[8px] text-s-lg font-normal text-center text-text mb-[20px]">
        {subTitle}
      </p>
      {link && (
        <div className="flex items-center mb-[20px]">
          <div className="flex items-center w-full overflow-hidden text-s-lg font-medium text-center border border-r-0 border-solid rounded-r-none text-blue-1 px-[13px] border-blue-2 h-[44px] rounded-[5px]">
            <p className="w-full mb-0 overflow-hidden text-left max-w-[188px] overflow-ellipsis whitespace-nowrap">
              {link}
            </p>
          </div>
          <Button
            mode={ButtonMode.FULL_PRIMARY}
            className="!text-s-lg !font-semibold !p-0 !min-w-[44px] !w-[44px] !rounded-l-none !h-[44px]"
            type="button"
            onClick={() => {
              if (isDesktop) {
                navigator.clipboard.writeText(link)
                setIsCopied(true)
              } else {
                share()
              }
            }}
          >
            {isDesktop ? (
              <Copy className="fill-white" />
            ) : (
              <Share className="fill-white" />
            )}
          </Button>
        </div>
      )}
      <Button
        mode={ButtonMode.SMALL}
        className="w-full text-s-lg font-semibold h-[44px]"
        onClick={onSubmit}
      >
        {buttonTitle}
      </Button>
    </Dialog>
  )
}

export default SuccessDialog
