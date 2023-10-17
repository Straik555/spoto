import { SnapshotOptions } from '@percy/core'
import { SnapshotNames } from '@tests/e2e/constants'

export const uploadSnapshot = (
  snapshotName: SnapshotNames,
  options?: SnapshotOptions
) => {
  cy.percySnapshot(snapshotName, options)
}
