export type AddUserProps = {
  open: boolean
  onClose: () => void
  onCreate: (n: string) => void
}

export type AddUserFormValues = {
  email: string
}
