import { ROUTES } from '@constants/routes'
import faker from '@faker-js/faker'
import { Users } from '@tests/e2e/fixtures/auth/types'
import {
  createEmail,
  getEmailContent,
  getEmails,
  getRandomTempMail,
  TempMailEmailsResponse,
} from '@tests/e2e/utils/emails'
import { navigate } from '@tests/e2e/utils/navigate'
import { recurse } from '@tests/e2e/utils/recurse'
import { $$ } from '@tests/e2e/constants/selectors'
import { theme } from '@tests/e2e/constants/theme'

describe('invite corp client as org admin', () => {
  let users: Users
  let email: string
  const $ = {
    get confirmEmailBtn() {
      return cy.get('a').contains('Confirm Email')
    },
    get firstnameInput() {
      return cy.get('[aria-label="firstName"]')
    },
    get lastnameInput() {
      return cy.get('[aria-label="lastName"]')
    },
    get emailInput() {
      return cy.get('[aria-label="email"]')
    },
    get inviteBtn() {
      return cy.get('button').contains('Invite')
    },
    get firstnameError() {
      return $$.firstnameInput.parent().siblings('[aria-label="input-error"]')
    },
    get lastnameError() {
      return $$.lastnameInput.parent().siblings('[aria-label="input-error"]')
    },
    get emailError() {
      return $$.emailInput.parent().siblings('[aria-label="input-error"]')
    },
  }

  beforeEach(function () {
    cy.fixture('auth/users').then((data: Users) => (users = data))
    email = getRandomTempMail()

    createEmail(email)
    navigate(ROUTES.LOGIN)
    cy.get('[name="usernameOrEmail"]').type('one@admin.com')
    $$.passwordInput.type('Qwerty1@')
    cy.get('span').contains('Log In').click()

    cy.get('button[aria-label="sidebar-menu-icon"]').click()
    cy.get('header a').contains('Users & Groups').click()
    cy.wait(1500)
    cy.get('button').contains('Add New User').should('be.enabled').click()
    cy.get('button[disabled]').contains('Invite')
  })

  it('neg case - invite user with empty fields', () => {
    $.firstnameInput.click()
    $.lastnameInput.click()
    $.firstnameError
      .should('contain', 'First Name is a required field')
      .should('have.css', 'color', theme.palette.red)
    $.emailInput.click().blur()
    $.lastnameError
      .should('contain', 'Last Name is a required field')
      .should('have.css', 'color', theme.palette.red)
    $.emailError
      .should('contain', 'Email is a required field')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - min characters for first/last name', () => {
    $.firstnameInput.type('t').blur()
    $.firstnameError
      .should('contain', 'Minimum 2 characters')
      .should('have.css', 'color', theme.palette.red)

    $.lastnameInput.type('t').blur()
    $.lastnameError
      .should('contain', 'Minimum 2 characters')
      .should('have.css', 'color', theme.palette.red)
  })

  it('invalid email', () => {
    $.emailInput.type('test').blur()
    $.emailError
      .should('contain', 'Not valid email format. Example: example@email.com')
      .should('have.css', 'color', theme.palette.red)
  })

  it('neg case - user already exists', function () {
    cy.get('button').contains('Cancel').click()
    cy.get('button').contains('Add New User').click()

    $.firstnameInput.type(faker.name.firstName())
    $.lastnameInput.type(faker.name.lastName())
    $.emailInput.type(users.email.ppu)
    $.inviteBtn.click()

    $$.errorToastMsg
      .contains('User already exists!')
      .should('be.visible')
      .should('have.css', 'color', theme.palette.red)
  })

  it('create corp client account, accept invitation and successfully login', function () {
    cy.get('button').contains('Cancel').click()
    cy.get('button').contains('Add New User').click()
    $.firstnameInput.type(faker.name.firstName())
    $.lastnameInput.type(faker.name.lastName())
    $.emailInput.type(email)
    $.inviteBtn.click()

    recurse(
      () => getEmails(email),
      (emails: TempMailEmailsResponse) => emails.count > 0
    )
      .then((tempEmailsRes) => {
        const emailInfo = tempEmailsRes.mail_list[0]
        return getEmailContent(emailInfo.mail_id, email)
      })
      .then((emailContent) => {
        cy.get('#__next').invoke('html', emailContent.html)

        $.confirmEmailBtn
          .invoke('attr', 'target', '_self')
          .invoke('attr', 'href')
          .then((href) => {
            return new URL(href)
          })
          .then((url) => {
            const qs = Object.fromEntries(
              new URLSearchParams(url.search).entries()
            )
            cy.reload()
            navigate(ROUTES.VERIFY_PHONE, { qs })
          })
        recurse(
          () => getEmails(email),
          (emails: TempMailEmailsResponse) => emails.count > 1
        )
          .then((tempEmailsRes) => {
            const emailInfo = tempEmailsRes.mail_list[0]
            return getEmailContent(emailInfo.mail_id, email)
          })
          .then((emailContent) => {
            cy.get('#__next').invoke('html', emailContent.html)

            cy.get('[data-muid="15c44a1d-7d28-47ce-bbdd-418d46053653"]')
              .children()
              .children()
              .children()
              .children()
              .children()
              .invoke('text')
              .then((newPassword) => {
                const text = newPassword
                cy.log(text)

                navigate(ROUTES.LOGIN)
                cy.get('[name="usernameOrEmail"]').type(email)
                $$.passwordInput.type(text)
                cy.get('span').contains('Log In').click()

                cy.location('pathname').should('eq', ROUTES.HOME)
              })
          })
      })
  })
})
