import { SpotInfo } from '@api/spot/types'

export type SpotAutocompleteProps = {
  onChange?: (spots: SpotInfo[]) => void
}

export type SpotAutocompleteFormValues = {
  search: string
  spots: SpotInfo[]
}
