import Close from '@assets/icons/close-24.svg'
import { DialogProps } from '@components/Dialog/Dialog.model'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import React, { FC, Fragment } from 'react'
import cn from 'classnames'
import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'

const Dialog: FC<DialogProps> = ({
  title,
  open,
  onClose,
  children,
  actions,
  initialRef,
  className,
  closeIcon,
  titleClassName,
  classNameOverlay,
  afterLeave,
}) => {
  const { isDesktop } = useDeviceInfo()

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={afterLeave}>
      <HeadlessDialog
        as="div"
        className="fixed inset-0 z-50 w-full h-full overflow-y-auto"
        open={open}
        onClose={onClose}
        initialFocus={initialRef}
      >
        <div className="flex justify-center h-screen min-h-screen p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay
              className={cn(
                'fixed inset-0 bg-bg-1 bg-opacity-75 transition-opacity backdrop-blur-sm',
                classNameOverlay
              )}
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                className,
                'w-full p-[16px] m-auto text-left align-bottom bg-white shadow-xl rounded-[10px] transform transition-all sm:my-[20vh]  sm:max-w-sm lg:max-w-[580px] sm:w-full sm:p-6',
                { 'absolute top-[200px] !m-0 !p-[35px]': isDesktop }
              )}
            >
              {title && (
                <HeadlessDialog.Title>
                  <p
                    className={cn(
                      'font-semibold text-center text-black text-s-xl',
                      {
                        'mb-[20px]': isDesktop,
                        'mb-[16px]': !isDesktop,
                      },
                      titleClassName
                    )}
                  >
                    {title}
                  </p>
                </HeadlessDialog.Title>
              )}
              <HeadlessDialog.Description as="div">
                {closeIcon && (
                  <div
                    className="absolute cursor-pointer right-[10px] top-[10px]"
                    onClick={onClose}
                  >
                    <Close className="fill-blue-3" />
                  </div>
                )}

                {children}
              </HeadlessDialog.Description>

              {actions}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  )
}

export default Dialog
