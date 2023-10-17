import { useDeviceInfo } from '@components/DeviceDetect/DeviceDetect'
import classNames from 'classnames'
import React, { FC } from 'react'
import { Button } from '@components/index'
import Title from '@components/Title/Title'
import Dialog from '@components/Dialog/Dialog'
import { TFindSpotJoinSpoto } from '@screens/user/FindSpot/FindSpotJoinSpoto/FindSpotJoinSpoto.model'
import { ButtonMode } from '@components/Button/Button.model'
import Close from '@assets/icons/close-24.svg'

export const FindSpotJoinSpoto: FC<TFindSpotJoinSpoto> = ({
  closeModal,
  onSubmit,
  isOpen,
}) => {
  const { isBrowser } = useDeviceInfo()

  const renderContent = () => (
    <>
      <Title
        as="h5"
        noCap
        className="w-full px-10 text-lg font-semibold text-center text-black"
      >
        To Book a Parking Spot Please Log In or Sign Up
      </Title>
      <div className="flex items-center justify-between w-full mt-[30px]">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            closeModal()
          }}
          mode={ButtonMode.SMALL_SECONDARY}
          className="px-5 text-s-sm font-semibold text-primary border-primary w-[154px] h-10"
        >
          Back to Search
        </Button>
        <Button
          onClick={onSubmit}
          mode={ButtonMode.SMALL}
          className="px-5 text-s-sm font-semibold text-white w-[154px] h-10"
        >
          Login/Signup
        </Button>
      </div>
    </>
  )

  return isBrowser && !isOpen ? (
    <div
      className={classNames(
        'flex flex-col !justify-start items-center py-7 px-4 mx-auto mb-2',
        {
          'justify-center h-full': isBrowser,
        }
      )}
    >
      {renderContent()}
    </div>
  ) : (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      classNameOverlay="!bg-opacity-0 !backdrop-blur-none !blur-none"
      className="w-[343px] !px-4 pt-[28px] pb-4 rounded-md shadow-1 bg-white"
    >
      <div className="absolute right-1 top-1" onClick={() => closeModal()}>
        <Close className="fill-blue-3" />
      </div>
      {renderContent()}
    </Dialog>
  )
}
