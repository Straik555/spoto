export type PersonCardGroupsProps = {
  onDelete: () => void
  group: {
    name: string
    id: number
    avatarUrl?: string
  }
}
