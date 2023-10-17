import { ROUTES } from '@constants/routes'
import { $$ } from '@tests/e2e/constants/selectors'
import { theme } from '@tests/e2e/constants/theme'
import { Users } from '@tests/e2e/fixtures/auth/types'
import { navigate } from '@tests/e2e/utils/navigate'

describe('Sign Up', () => {
  let users: Users
  const $ = {
    get signupBtn() {
      return cy.get('button').contains('Sign Up')
    },
    get loginBtn() {
      return cy.get('a').contains('Log In')
    },
    get loginLoginBtn() {
      return cy.get('span').contains('Log In')
    },
    get firstnameError() {
      return $$.firstnameInput.parent().siblings('[aria-label="input-error"]')
    },
    get lastnameError() {
      return $$.lastnameInput.parent().siblings('[aria-label="input-error"]')
    },
    get phoneError() {
      return cy
        .get('.phone_input_container')
        .parent()
        .children('[aria-label="input-error"]')
    },
    get usernameError() {
      return $$.emailInput.parent().siblings('[aria-label="input-error"]')
    },
    get passwordError() {
      return $$.passwordInput.parent().siblings('[aria-label="input-error"]')
    },
    get usernameInput() {
      return cy.get('[name="usernameOrEmail"]')
    },
  }

  beforeEach(function () {
    navigate(ROUTES.REGISTER)
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('sign up button is disabled', () => {
    $.signupBtn.should('be.disabled')
  })

  it('log in button exists + navigation', () => {
    $.loginBtn.parent().should('be.visible').should('be.enabled').click()

    cy.location('pathname').should('eq', ROUTES.LOGIN) //button navigated to login page
  })

  it('neg case - empty email, required field', () => {
    $$.firstnameInput.click()
    $$.lastnameInput.click()
    $.firstnameError
      .should('contain', 'First Name is a required field')
      .should('have.css', 'color', theme.palette.red)

    cy.get('[title="Australia: + 61"]').should('be.visible')
    $$.phoneInput.click()
    $.lastnameError
      .should('contain', 'Last Name is a required field')
      .should('have.css', 'color', theme.palette.red)

    $$.emailInput.click()
    $.phoneError
      .should('contain', 'Number must contain 9 digits') //it contains 9 only if starts from 4
      .should('have.css', 'color', theme.palette.red)

    $$.passwordInput.click().blur()
    $.usernameError
      .should('contain', 'Email is a required field')
      .should('have.css', 'color', theme.palette.red)
    $.passwordError
      .should('contain', 'Password is a required field')
      .should('have.css', 'color', theme.palette.red) //all validation messages should be displayed
  })

  it('neg case - invalid phone format AU - 10', () => {
    $$.phoneInput.type('0').blur() // if number starts from 0, phone must contain 10 digits

    $.phoneError
      .should('contain', 'Number must contain 10 digits')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - invalid phone format AU - not from 0/4', () => {
    $$.phoneInput.type('1').blur() // if number starts not from 0/4 - it's invalid phone

    $.phoneError
      .should('contain', 'Number must begin with a “0” or “4”')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - invalid email', () => {
    $$.emailInput.should('be.visible').type('test').blur() //enter invalid email
    $.usernameError
      .should('contain', 'Not valid email format. Example: example@email.com')
      .should('have.css', 'color', theme.palette.red)

    $$.emailInput.type('@test.com')
    $.usernameError.and(($er) => {
      expect($er).not.to.exist
    }) //validation message should disappears after email become valid
  })

  it('password - show/hide', () => {
    $$.passwordInput.type('123456') //enter password

    cy.get('[aria-label="show-password"]').click() //click to display password
    cy.get('[name="password"][type="text"]').should('have.value', '123456')

    cy.get('[aria-label="hide-password"]').click() //click to hide password
    cy.get('[name="password"][type="password"]').should('be.visible')
  })

  it('neg case - min characters for first/last name', () => {
    $$.firstnameInput.type('1')
    $$.lastnameInput.type('1').blur()

    $.firstnameError
      .should('contain', 'Minimum 2 characters')
      .should('have.css', 'color', theme.palette.red)

    $.lastnameError
      .should('contain', 'Minimum 2 characters')
      .should('have.css', 'color', theme.palette.red)

    $$.firstnameInput.type('1')
    $$.lastnameInput.type('1')

    $.firstnameError.and(($er) => {
      expect($er).not.to.exist
    })
    $.lastnameError.and(($er) => {
      expect($er).not.to.exist
    }) //validation messages disappear
  })

  it('neg case - min password', () => {
    $$.passwordInput.type('12345').blur()

    $.passwordError
      .should('contain', 'Minimum 6 characters')
      .should('have.css', 'color', theme.palette.red)

    $$.passwordInput.type('1')
    $.passwordError.and(($er) => {
      expect($er).not.to.exist
    }) //validation message disappears
  })

  it('user with this email exists', () => {
    $$.firstnameInput.type('Test')
    $$.lastnameInput.type('User')
    $$.phoneInput.type('444444444')
    $$.emailInput.type(users.email.ppu)
    $$.passwordInput.type(users.password)

    $.signupBtn.click()

    $$.errorToastMsg
      .contains('User already exists!')
      .should('be.visible')
      .should('have.css', 'color', theme.palette.red)
    cy.location('pathname').should('eq', ROUTES.REGISTER)
  })
})
