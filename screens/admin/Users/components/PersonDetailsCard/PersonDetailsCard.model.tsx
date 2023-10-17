import { AllGroupInfo } from '@api/group/types'

export type PersonDetailsCardProps = {
  group: AllGroupInfo
  setDeleteGroupVisible: (t: boolean) => void
  setGroupId: (t: string) => void
  onTab: () => void
  onDetail: (n: number) => void
}
