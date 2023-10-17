export const $$ = {
  //toast messages
  get errorToastMsg() {
    return cy.get('.Toastify__toast--error > [role="alert"]')
  },
  get successToastMsg() {
    return cy.get('.Toastify__toast--success  > [role="alert"]')
  },

  //inputs
  get firstnameInput() {
    return cy.get('[name="firstName"]')
  },
  get lastnameInput() {
    return cy.get('[name="lastName"]')
  },
  get phoneInput() {
    return cy.get('[name="phone"]')
  },
  get emailInput() {
    return cy.get('[name="email"]')
  },
  get passwordInput() {
    return cy.get('[name="password"]')
  },
}
