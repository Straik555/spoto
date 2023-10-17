import React from 'react'

import Dialog from '@components/Dialog/Dialog'
import CloseIcon from '@assets/icons/close-20.svg'

import { ForgotPasswordModalProps } from './ForgotPassword.model'
import ForgotPasswordMobile from './ForgotPasswordMobile'

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = (props) => {
  const { onClose } = props
  return (
    <Dialog open onClose={onClose}>
      <span className="absolute cursor-pointer top-4 right-4">
        <CloseIcon className="fill-blue-3" onClick={onClose} />
      </span>
      <ForgotPasswordMobile />
    </Dialog>
  )
}

export default ForgotPasswordModal
