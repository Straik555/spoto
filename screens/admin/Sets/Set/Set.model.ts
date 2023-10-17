import { SetModel } from '@api/set/types'

export interface SetProps {
  setId?: string
}

export enum SetTabs {
  Main = 'Main',
  Spots = 'Spots',
  AccessRights = 'Access Rights',
}

export interface EditModeMainProps {
  set: SetModel
}
