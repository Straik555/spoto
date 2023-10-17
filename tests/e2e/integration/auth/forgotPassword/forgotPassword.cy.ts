import { ROUTES } from '@constants/routes'
import { $$ } from '@tests/e2e/constants/selectors'
import { theme } from '@tests/e2e/constants/theme'
import { Users } from '@tests/e2e/fixtures/auth/types'
import { navigate } from '@tests/e2e/utils/navigate'

describe('Forgot password', async () => {
  let users: Users
  const $ = {
    get emailInput() {
      return cy.get('[name="email"]')
    },
    get emailError() {
      return $.emailInput.parent().siblings('[aria-label="input-error"]')
    },
    get sendBtn() {
      return cy.get('button').contains('Send')
    },
  }

  beforeEach(function () {
    navigate(ROUTES.FORGOT_PASSWORD)
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('send button is disabled, email is required', () => {
    $.sendBtn.should('be.disabled')
    $.emailInput.click().blur()

    $.emailError
      .should('be.visible')
      .contains('Email is a required field')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - invalid email-1', () => {
    $.emailInput.should('be.visible').should('be.enabled').type('one').blur() //enter email

    $.emailError
      .should('be.visible')
      .contains('Not valid email format. Example: example@email.com')
      .should('have.css', 'color', theme.palette.red)

    $.sendBtn.should('be.visible').should('not.be.enabled')
  })

  it('neg case - invalid email-2', () => {
    $.emailInput.should('be.visible').should('be.enabled').type('one@gh').blur()

    $.emailError
      .should('be.visible')
      .contains('Not valid email format. Example: example@email.com')
      .should('have.css', 'color', theme.palette.red)

    $.sendBtn.should('be.visible').should('not.be.enabled')
  })

  it('neg case - valid email, not existing account', () => {
    $.emailInput.type('test123123@gmail.com')

    $.sendBtn.should('be.enabled').click()

    $$.errorToastMsg
      .contains('User not found')
      .should('be.visible')
      .should('have.css', 'color', theme.palette.red)
  })

  it('pos case - correct email, request sent', function () {
    $.emailInput.type(users.email.po)

    $.sendBtn.should('be.enabled').click()

    cy.get('div').contains('Please check your email')
    cy.get('div').contains(users.email.po)
    $$.successToastMsg
      .contains('Request is successfully sent!')
      .should('be.visible')
      .should('have.css', 'color', theme.palette.green)

    cy.get('a').contains('Login').parent().click()
    cy.location('pathname').should('eq', ROUTES.LOGIN)
  })
})
