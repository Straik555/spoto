import React, { useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog'
import ConfirmRejectIcon from '@assets/icons/large-icons/cancel-is-reject-128.svg'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Reusable Components/Dialog',
  component: ConfirmationDialog,
}

export const DefaultConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <ConfirmationDialog
        open={isOpen}
        titleIcon={<ConfirmRejectIcon className="mx-auto mt-0 mb-[40px]" />}
        title="Decline this invitation?"
        cancelText="Cancel"
        applyText="Decline"
        onApply={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        Lorem Inpus
      </ConfirmationDialog>
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open Confirmation Dialog
      </Button>
    </>
  )
}

export const NoIconConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <ConfirmationDialog
        open={isOpen}
        title="Decline this invitation?"
        cancelText="Cancel"
        applyText="Decline"
        onApply={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        Lorem Inpus
      </ConfirmationDialog>
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open No Icon Confirmation Dialog
      </Button>
    </>
  )
}
