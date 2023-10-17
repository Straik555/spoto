import { hardwareApi } from '@api/hardware'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'
import Dialog from '@components/Dialog/Dialog'
import React, { FC, useState } from 'react'

const SpotsOrderHardware: FC = () => {
  const { data } = hardwareApi.endpoints.getSpotHardwareStatus.useQuery()
  const [hardwareDialogVisible, setHardwareDialogVisible] = useState(false)
  const requiredSpollardsCount = data?.countOfRequiredSpollards || 0

  if (requiredSpollardsCount === 0) return null

  return (
    <>
      <div className="fixed bottom-0 z-10 flex items-center justify-between w-full p-3 bg-blue-4">
        <p className="m-0 font-semibold font-s-base text-blue-1">
          Order new hardware for spot
        </p>

        <Button
          mode={ButtonMode.SMALL}
          onClick={() => setHardwareDialogVisible(true)}
        >
          Order
        </Button>
      </div>

      <Dialog
        open={hardwareDialogVisible}
        onClose={() => setHardwareDialogVisible(false)}
        title="Order new hardware for spot?"
      >
        <p className="mb-10 font-normal text-center text-s-base text-text">
          You have{' '}
          <span className="font-semibold text-primary text-s-base">
            {requiredSpollardsCount} spots
          </span>
          , that unlinked to spollard. <br /> Do you want to order missing
          spollards?
        </p>

        <div className="flex">
          <Button
            mode={ButtonMode.FULL_SECONDARY}
            onClick={() => setHardwareDialogVisible(false)}
            className="mr-1 text-base font-semibold border-2 text-blue-3"
          >
            Cancel
          </Button>
          <Button
            mode={ButtonMode.FULL_PRIMARY}
            onClick={() => {
              console.log('Order hardware')
            }}
            className="text-base font-semibold"
          >
            Order
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export default SpotsOrderHardware
