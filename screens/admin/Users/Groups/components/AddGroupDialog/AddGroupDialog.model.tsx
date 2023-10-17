export type AddGroupProps = {
  open: boolean
  onClose: () => void
  onCreate: (n: string) => void
}

export type AddGroupFormValues = {
  groupName: string
}
