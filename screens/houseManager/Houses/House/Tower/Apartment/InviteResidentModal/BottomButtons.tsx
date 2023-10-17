import React from 'react'

import Button from '@components/Button'
import { ButtonMode } from '@components/Button/Button.model'

import { BottomButtonsProps } from './InviteResidentModal.model'

const BottomButtons: React.FC<BottomButtonsProps> = (props) => {
  const { handleSubmit, submitDisabled, submitButtonText } = props
  return (
    <div className="flex pt-4 justify-stretch">
      <Button
        className="text-s-lg"
        mode={ButtonMode.FULL_PRIMARY}
        onClick={handleSubmit}
        disabled={submitDisabled}
      >
        {submitButtonText}
      </Button>
    </div>
  )
}

export default BottomButtons
