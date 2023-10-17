export type SpotRouteParams = {
  id: string
  type?: [SpotDetailType]
}

export type SpotProps = {
  id: number
  type?: SpotDetailType
}

export type SpotMainProps = SpotProps
export type SpotMainInfoRowProps = {
  label: string
  valueClassName?: string
}
export type SpotSpollardProps = SpotProps
export type SpotUsersProps = SpotProps

export enum SpotDetailType {
  Main = 'main',
  Spollard = 'spollard',
  Users = 'users',
}
