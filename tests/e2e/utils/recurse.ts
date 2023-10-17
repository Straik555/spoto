import { recurse as recurseLibFn } from 'cypress-recurse'

export const recurse = <T>(
  commandsFn:
    | (() => Cypress.Chainable<Promise<T>>)
    | (() => Cypress.Chainable<T>),
  checkFn: (x: T, reducedValue?: any) => boolean | void | Chai.Assertion
) => {
  return recurseLibFn(commandsFn as () => Cypress.Chainable<T>, checkFn, {
    timeout: 90000,
    delay: 2000,
    log: false,
  })
}
