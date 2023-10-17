export enum TextStyleProps {
  NORMAl = 'NORMAl',
  SEMIBOLD_BLACK = 'SEMIBOLD_BLACK',
}

export interface PropertySectionProps {
  title: string
  text: string | number
  textStyle: TextStyleProps
  textClassName?: string
  suffix?: string
}
