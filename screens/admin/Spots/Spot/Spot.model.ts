export type SpotProps = {
  spotId: string
  activeTabQuery?: SpotTabs
  spotUrlBack?: string
}

export enum SpotTabs {
  Main = 'Main',
  Spollard = 'Spollard',
  AccessRights = 'Access Rights',
}
