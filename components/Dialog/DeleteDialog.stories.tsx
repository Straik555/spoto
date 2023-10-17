import React, { useState } from 'react'
import DeleteDialog from '@components/Dialog/DeleteDialog'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Reusable Components/Dialog',
  component: DeleteDialog,
}

export const DeleteDialogModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDisabled, setIsOpenDisabled] = useState(false)
  return (
    <>
      <DeleteDialog
        open={isOpen}
        message="Delete this set?"
        onSubmit={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />
      <DeleteDialog
        open={isOpenDisabled}
        message="Delete this set?"
        onClose={() => setIsOpenDisabled(false)}
        disabled
      />
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2 mr-2"
      >
        Open Delete Dialog
      </Button>
      <Button
        onClick={() => setIsOpenDisabled(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open Delete Disabled Dialog
      </Button>
    </>
  )
}
