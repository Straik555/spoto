export type InviteByQrFormProps = {
  closeModal: () => void
}

export type UseInviteByQrFormState = {
  expires: string
  loading: boolean
  isExpired: boolean
  qrCodeLink: string
}

export type UseInviteByQrFormActions = {
  handlePerformQrCode: () => void
  handleRenewQrCode: () => void
}

export type UseInviteByQrForm = () => [
  UseInviteByQrFormState,
  UseInviteByQrFormActions
]
