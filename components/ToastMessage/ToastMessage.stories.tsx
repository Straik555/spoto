import React from 'react'
import ToastMessage from '@components/ToastMessage/index'
import { toast } from 'react-toastify'
import './ToastMessageStories.css'

export default {
  title: 'Reusable Components/ToastMessage',
  component: ToastMessage,
}

export const ErrorToast = () => {
  const handleError = () => toast.error('Internal server error.')
  return (
    <div>
      <ToastMessage />
      <button onClick={() => handleError()} style={{ color: 'red' }}>
        Error
      </button>
    </div>
  )
}

export const SuccessToast = () => {
  const handleSuccess = () => toast.success('The server is running.')
  return (
    <div>
      <ToastMessage />
      <button onClick={() => handleSuccess()} style={{ color: 'green' }}>
        Success
      </button>
    </div>
  )
}

export const InfoToast = () => {
  const handleInfo = () => toast.info('Info.')
  return (
    <div>
      <ToastMessage />
      <button onClick={() => handleInfo()} style={{ color: '#527edb' }}>
        Info
      </button>
    </div>
  )
}
