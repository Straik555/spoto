import { ROUTES } from '@constants/routes'
import { $$ } from '@tests/e2e/constants/selectors'
import { theme } from '@tests/e2e/constants/theme'
import { Users } from '@tests/e2e/fixtures/auth/types'
import { navigate } from '@tests/e2e/utils/navigate'

describe('Login', async () => {
  let users: Users
  const $ = {
    get loginBtn() {
      return cy.get('span').contains('Log In')
    },
    get usernameInput() {
      return cy.get('[name="usernameOrEmail"]')
    },
    get usernameError() {
      return $.usernameInput.parent().siblings('[aria-label="input-error"]')
    },
    get passwordError() {
      return $$.passwordInput.parent().siblings('[aria-label="input-error"]')
    },
    get sidebarMenuBtn() {
      return cy.get('button[aria-label="sidebar-menu-icon"]')
    },
  }

  beforeEach(function () {
    navigate(ROUTES.LOGIN)
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('sign up button exists', () => {
    cy.get('span')
      .contains('Sign up')
      .parentsUntil('div')
      .should('be.visible')
      .should('be.enabled')
      .click({ multiple: true })

    cy.location('pathname').should('eq', ROUTES.REGISTER)
  })

  it('log in button is inactive', () => {
    $.loginBtn.parent().should('be.visible').should('be.disabled')
  })

  it('forgot password', () => {
    cy.get('[href="/forgot-password"]').contains('Forgot Password?').click()

    cy.location('pathname').should('eq', ROUTES.FORGOT_PASSWORD)

    cy.get('[aria-label="back-button"]').click()

    $.loginBtn.parent().should('be.visible').should('be.disabled')
  })

  it('neg case - Unable to login with empty form values', () => {
    $.loginBtn.should('be.visible').should('not.be.enabled')
  })

  it('neg case - empty email, required field', () => {
    $.usernameInput.click()
    $$.passwordInput.type('123456')
    $.loginBtn.should('be.visible').should('not.be.enabled')
    $.usernameError
      .should('be.visible')
      .should('contain.text', 'Username Or Email is a required field')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - empty password, required field', () => {
    $$.passwordInput.click()
    $.usernameInput.type('one@test.co')
    $.loginBtn.should('be.visible').should('not.be.enabled')

    $.passwordError
      .should('be.visible')
      .contains('Password is a required field')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - invalid email-1', () => {
    $.usernameInput.type('one') //enter email
    $$.passwordInput.type('123456') //enter password

    $.usernameError
      .should('be.visible')
      .contains('Not valid email format. Example: example@email.com')
      .should('have.css', 'color', theme.palette.red)

    $.loginBtn.should('be.visible').should('not.be.enabled')
  })

  it('neg case - invalid email-2', () => {
    $.usernameInput.type('one@gh')
    $$.passwordInput.type('123456')

    $.usernameError
      .should('be.visible')
      .should('have.css', 'color', theme.palette.red)

    $.loginBtn.should('be.visible').should('not.be.enabled')
  })

  it('incorrect email/password', function () {
    $.usernameInput.type(users.email.ppu)
    $$.passwordInput.type(users.password + users.password)
    $.loginBtn.parent().click()

    $$.errorToastMsg
      .contains('Incorrect email or password.')
      .should('be.visible')
      .should('have.css', 'color', theme.palette.red)
  })

  it('logs in with correct credentials', function () {
    $.usernameInput.type(users.email.ppu)
    $$.passwordInput.type(users.password)
    $.loginBtn.click()

    cy.location('pathname').should('eq', ROUTES.HOME)
  })
})
