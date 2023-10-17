export interface ConfirmationDialogProps {
  open: boolean
  children?: string | JSX.Element
  title: string
  titleIcon?: JSX.Element
  onClose: () => void
  onApply: () => void
  applyText: string
  cancelText?: string
  titleClassName?: string
  titleContainerClassName?: string
}
