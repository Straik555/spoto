export type RegisterPageQueryParams = {
  email?: string
  invitationToken?: string
  token?: string
  qr?: string
}

export type RegisterState = {
  disabled: boolean
  inputClassName: string
  isSuccess: boolean
  userEmail: string
  houseName?: string
  prefilledUsernameOrEmail?: string
}

export type RegisterActions = {
  handleSubmit: () => void
  switchToLogin?: () => void
}

export type RegisterProps = {
  houseName?: string
  inviteeEmail?: string
  switchToLogin?: () => void
}

export type UseRegister = (
  props: RegisterProps
) => [RegisterState, RegisterActions]
