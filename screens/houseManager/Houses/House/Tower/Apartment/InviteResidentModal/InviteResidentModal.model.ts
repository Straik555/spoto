export enum InviteResidentModalMode {
  ByEmail = 'ByEmail',
  ByQr = 'ByQr',
}

export type TabButtonProps = {
  isActive: boolean
  onClick: () => void
}

export type InviteByEmailFormProps = {
  closeModal: () => void
}

export type InviteByEmailFormValues = {
  email: string
}

export type BottomButtonsProps = {
  closeModal: () => void
  handleSubmit: () => void
  submitDisabled: boolean
  submitButtonText: string
}
