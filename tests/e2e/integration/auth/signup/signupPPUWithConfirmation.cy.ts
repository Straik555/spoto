import { ROUTES } from '@constants/routes'
import { Users } from '@tests/e2e/fixtures/auth/types'
import {
  createEmail,
  getEmailContent,
  getEmails,
  getRandomTempMail,
  TempMailEmailsResponse,
} from '@tests/e2e/utils/emails'
import faker from '@faker-js/faker'
import { navigate } from '@tests/e2e/utils/navigate'
import { recurse } from '@tests/e2e/utils/recurse'
import { $$ } from '@tests/e2e/constants/selectors'
import { config } from '@tests/e2e/config/runtime'
import { theme } from '@tests/e2e/constants/theme'

describe('Email confirmation', () => {
  let email: string
  let users: Users
  const accountSid = 'AC6b0bf160f5df3fae86c01f3c66b35a55'
  const authToken = '68e0b2fb2674b7b03a8ee7150213856b'
  const fakePhone = faker.phone.phoneNumber('4## ### ##5')
  const $ = {
    get signupBtn() {
      return cy.get('button').contains('Sign Up')
    },
    get loginBtn() {
      return cy.get('a').contains('Log In')
    },
    get confirmEmailBtn() {
      return cy.get('a').contains('Confirm Email')
    },
  }

  beforeEach(() => {
    cy.fixture('auth/users').then((data: Users) => (users = data))
  })

  it('resend inactive for 2 min', async () => {
    if (config.LONG_RUNNING_TESTS) {
      navigate(ROUTES.REGISTER)
      email = getRandomTempMail()
      createEmail(email)

      $$.firstnameInput.type(faker.name.firstName())
      $$.lastnameInput.type(faker.name.lastName())
      $$.phoneInput.type(fakePhone)
      $$.emailInput.type(email)
      $$.passwordInput.type(users.password)

      $.signupBtn.click()

      cy.get('div').contains('Please confirm your email.')
      cy.get('div').contains(email)

      getEmails(email).then((res) => {
        console.log(res)
      })

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
              $$.phoneInput.should('have.value', '+61 | ' + fakePhone)
              cy.get('button').contains('Confirm').click()

              cy.get('div').contains('Resend code').click()
              cy.wait(110000)
              cy.get('div')
                .contains('Your code has expired')
                .should('be.visible')
              cy.get('div').contains('Resend code').click()
              cy.get('div').contains('Code active for').should('be.visible')
            })
        })
    }
  })

  it('resend confirmation email', async () => {
    navigate(ROUTES.REGISTER)
    email = getRandomTempMail()
    createEmail(email)

    $$.firstnameInput.type(faker.name.firstName())
    $$.lastnameInput.type(faker.name.lastName())
    $$.phoneInput.type(fakePhone)
    $$.emailInput.type(email)
    $$.passwordInput.type(users.password)

    $.signupBtn.click()

    cy.get('div').contains('Please confirm your email.')
    cy.get('div').contains(email)

    if (config.LONG_RUNNING_TESTS) {
      cy.get('div').contains('Resend Confirmation Email').click()
      $$.successToastMsg
        .contains('Confirmation email resent')
        .should('have.css', 'color', theme.palette.green)
      cy.wait(3000)
      cy.get('div').contains('Resend Confirmation Email').click()
      $$.errorToastMsg
        .contains(
          'Please wait for 5 minute(s) before requesting a new confirmation email'
        )
        .should('be.visible')
        .should('have.css', 'color', theme.palette.red)
    }
  })

  it('sends confirmation email', async () => {
    navigate(ROUTES.REGISTER)
    email = getRandomTempMail()
    createEmail(email)

    $$.firstnameInput.type(faker.name.firstName())
    $$.lastnameInput.type(faker.name.lastName())
    $$.phoneInput.type(fakePhone)
    $$.emailInput.type(email)
    $$.passwordInput.type(users.password)

    $.signupBtn.click()

    cy.get('div').contains('Please confirm your email.')
    cy.get('div').contains(email)

    getEmails(email).then((res) => {
      console.log(res)
    })

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
            $$.phoneInput.should('have.value', '+61 | ' + fakePhone)

            //re-enter number
            cy.log('re-enter correct number checking')

            $$.phoneInput.type('{selectall}{backspace}').blur()
            cy.get('.phone_input_container')
              .parent()
              .children('[aria-label="input-error"]')
              .contains('Number must contain 9 digits')
            $$.phoneInput.type('5')
            cy.get('button').contains('Confirm').click()
            cy.contains('Verification code').should('be.visible')
            cy.get('div').contains('Re-enter Correct Number').click()
            cy.get('div').contains('Verify phone number').should('be.visible')
            $$.phoneInput.type('{selectall}{backspace}').blur()
            $$.phoneInput.type('4')
            cy.get('button').contains('Confirm').click()

            //enter incorrect code
            cy.log('neg case - enter incorrect code')

            cy.get('[type="tel"][data-id="0"]').type('111111')

            $$.errorToastMsg
              .children()
              .contains('Incorrect code please check again')
              .should('be.visible')
            cy.wait(1500)

            //correct code from twilio
            cy.log('enter correct code from twilio')
            cy.request({
              method: 'GET',
              url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
              auth: {
                username: accountSid,
                password: authToken,
                AuthMethod: 'BasicAuth',
              },
            })
              .its('body')
              .then((res) => {
                cy.wait(1500) //wait for SMS
                const otpcode = res.messages[0].body.substring(0, 6)
                cy.get('[type="tel"][data-id="0"').type(otpcode)
                cy.location('pathname').should('eq', ROUTES.HOME)
                cy.get('button[aria-label="sidebar-menu-icon"]').click()
                cy.contains(email).should('be.visible')
              })
          })
      })
  })
})
