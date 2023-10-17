import React, { useState } from 'react'
import SuccessDialog from '@components/Dialog/SuccessDialog'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Reusable Components/Dialog',
  component: SuccessDialog,
}

export const DefaultSuccessDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <SuccessDialog
        buttonTitle="Back to Dashboard"
        title="Invitation succesfully sent!"
        subTitle="You may share the link below"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
        link="values.inviteSendLink"
      />
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="mb-2 text-sm"
      >
        Open Success Dialog
      </Button>
    </>
  )
}
