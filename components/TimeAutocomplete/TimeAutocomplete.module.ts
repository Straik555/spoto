export type TimeAutocompleteProps = {
  name: string
  intervals: string[]
  timeZone?: string
  startTime?: string
  endTime?: string
}

export type TimeAutocompletePairProps = {
  intervals: string[]
  timeZone?: string
  label1: string
  label2: string
  name1: string
  name2: string
  classNameWrapper?: string
  classNameLabel?: string
}

export type Option = {
  label: string
  value: string
}
