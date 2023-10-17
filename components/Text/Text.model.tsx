export enum TextVariant {
  Text = 'text',
  Money = 'money',
}

export type TextProps = {
  variant?: TextVariant
  isLimited?: boolean
}
