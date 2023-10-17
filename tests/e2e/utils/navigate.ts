import { ROUTES } from '@constants/routes'
import { config } from '@tests/e2e/config/runtime'
import VisitOptions = Cypress.VisitOptions

export const navigate = (route: ROUTES, options?: Partial<VisitOptions>) => {
  cy.visit(`${config.BASE_URL}${route}`, options)
}
