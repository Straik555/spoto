import { DialogProps } from '@components/Dialog/Dialog.model'

export type InvitePersonDialogProps = Pick<DialogProps, 'open' | 'onClose'>

export type InvitePersonFormValues = {
  email: string
  firstName: string
  lastName: string
}
