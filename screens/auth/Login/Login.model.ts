import { LoginQueryParams } from '@screens/auth/types'

export type LoginState = {
  disabled: boolean
  houseName?: string
  loading: boolean
} & LoginQueryParams

export type LoginActions = {
  handleSubmit: () => void
  switchToRegister?: () => void
}

export type LoginProps = {
  inviteeEmail?: string
  switchToRegister?: () => void
}

export type UseLogin = (props: LoginProps) => [LoginState, LoginActions]

export type AuthenticateUserFormValues = {
  email: string
  password: string
}
