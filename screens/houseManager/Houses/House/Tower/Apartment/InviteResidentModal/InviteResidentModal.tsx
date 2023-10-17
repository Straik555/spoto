import React, { useMemo, useState } from 'react'

import { ButtonIcon, ButtonMode } from '@components/Button/Button.model'
import Button from '@components/Button'
import Dialog from '@components/Dialog/Dialog'
import CloseIcon from '@assets/icons/close-20.svg'
import Title from '@components/Title/Title'

import { InviteResidentModalMode } from './InviteResidentModal.model'
import InviteByEmailForm from './InviteByEmailForm'
import InviteByQrForm from './InviteByQrForm/InviteByQrForm'
import TabButton from './TabButton'

const InviteResidentModal = () => {
  const [mode, setMode] = useState<InviteResidentModalMode | ''>('')

  const setByEmailMode = () => setMode(InviteResidentModalMode.ByEmail)
  const setByQrMode = () => setMode(InviteResidentModalMode.ByQr)
  const closeModal = () => setMode('')

  const { isByEmailMode, isByQrMode } = useMemo(() => {
    return {
      isByEmailMode: mode === InviteResidentModalMode.ByEmail,
      isByQrMode: mode === InviteResidentModalMode.ByQr,
    }
  }, [mode])

  return (
    <>
      <Button
        mode={ButtonMode.FULL_PRIMARY}
        icon={ButtonIcon.ADD_WHITE}
        className="my-4 !py-2.5 !text-base !font-semibold rounded-md fixed bottom-0 left-0 mx-4 w-[calc(100%-32px)]"
        onClick={setByEmailMode}
      >
        Add Occupant
      </Button>
      {!!mode && (
        <Dialog open onClose={closeModal} title="Add Occupant">
          <span className="absolute cursor-pointer top-[14px] right-[12px]">
            <CloseIcon className="fill-blue-3" onClick={closeModal} />
          </span>
          <div className="flex items-center mt-[18px] mb-[15px]">
            <TabButton isActive={isByEmailMode} onClick={setByEmailMode}>
              <Title as="span">Email</Title>
            </TabButton>
            <TabButton isActive={isByQrMode} onClick={setByQrMode}>
              <Title as="span">QR Code</Title>
            </TabButton>
          </div>
          {isByEmailMode && <InviteByEmailForm closeModal={closeModal} />}
          {isByQrMode && <InviteByQrForm closeModal={closeModal} />}
        </Dialog>
      )}
    </>
  )
}

export default InviteResidentModal
