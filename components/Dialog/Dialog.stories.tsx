import React, { useState } from 'react'
import Dialog from '@components/Dialog/Dialog'
import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

export default {
  title: 'Reusable Components/Dialog',
  component: Dialog,
}

export const DefaultDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Dialog onClose={() => setIsOpen(false)} title="Add Spot" open={isOpen}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus
        leo suscipit libero luctus auctor.
      </Dialog>
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open Default Dialog
      </Button>
    </>
  )
}

export const StyledDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Dialog
        onClose={() => setIsOpen(false)}
        title="Add Spot"
        open={isOpen}
        className="!bg-bg border-4 border-primary p-5"
      >
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </Dialog>
      <Button
        onClick={() => setIsOpen(true)}
        mode={ButtonMode.SMALL}
        className="text-sm mb-2"
      >
        Open Styled Dialog
      </Button>
    </>
  )
}
