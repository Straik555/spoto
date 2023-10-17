import { ROUTES } from '@constants/routes'
import { SnapshotNames } from '@tests/e2e/constants'
import { navigate } from '@tests/e2e/utils/navigate'
import { uploadSnapshot } from '@tests/e2e/utils/uploadSnapshot'

describe('Login Page', function () {
  beforeEach(function () {
    navigate(ROUTES.LOGIN)
  })

  it('Loads login page', function () {
    cy.contains(/log in/gi).should('exist')

    uploadSnapshot(SnapshotNames.AUTH_LOGIN)
  })
})
