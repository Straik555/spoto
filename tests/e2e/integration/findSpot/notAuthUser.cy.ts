import { ROUTES } from '@constants/routes'
import { Users } from '@tests/e2e/fixtures/auth/types'
import { navigate } from '@tests/e2e/utils/navigate'

describe('Forgot password', async () => {
  let users: Users
  const $ = {
    get searchLine() {
      return cy.get('[data-testid="findSpotControlsAddress"]')
    },
    get sendBtn() {
      return cy.get('button').contains('Send')
    },
  }

  beforeEach(function () {
    navigate(ROUTES.HOME)
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('navigation in search, apply button is disabled', () => {
    $.searchLine.should(
      'have.attr',
      'placeholder',
      'Where do you want to park?'
    )
    $.searchLine.click()
    cy.get('button[disabled]').contains('Apply')
    cy.get('a[href="#"]').children('span').should('contain', 'Back').click()
    cy.location('pathname').should('eq', ROUTES.HOME)
  })

  it.only('search results', () => {
    $.searchLine.type('Sydney NSW,  Australia') // enter location
    cy.get('button').contains('Apply').should('be.enabled')
    cy.get('button').contains('Apply').click() //search

    cy.get('button[disabled]').contains('Search')
    cy.get('#headlessui-radiogroup-option-1').click() // select today
    cy.get('#headlessui-radiogroup-option-6').click() // current time
    cy.get('button').contains('Search').should('be.enabled')
    cy.get('button').contains('Search').click() // search results

    cy.wait(2500)
    cy.get('h5')
      .invoke('text')
      .then((text) => {
        const setName = text
        //cy.log(setName)

        cy.get('button[type="button"]').contains('Select').should('be.visible')
        cy.get('[type="button"]').contains('Select').click()
        cy.get('#headlessui-description-13')
          .children('h5')
          .contains('To Book a Parking Spot Please Log In or Sign Up')

        cy.get('button').contains('Back to Search').should('be.visible')
        cy.get('button').contains('Login/Signup').should('be.visible')

        cy.get('button').contains('Back to Search').click()
        cy.location('pathname').should('eq', ROUTES.HOME)
        cy.get('button').contains('Select').should('be.visible')

        cy.get('button[type="button"]').contains('Select').click()
        cy.get('button').contains('Login/Signup').click()
        cy.location('pathname').should('eq', ROUTES.LOGIN)

        cy.get('[name="usernameOrEmail"]').type(users.email.ppu)
        cy.get('[name="password"]').type(users.password)
        cy.get('span').contains('Log In').click()

        cy.get('h5').invoke('text').should('eq', setName)
      })
  })
})
