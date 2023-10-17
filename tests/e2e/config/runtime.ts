export const config = {
  BASE_URL: Cypress.env('baseUrl'),
  API_URL: Cypress.env('apiUrl'),
  LONG_RUNNING_TESTS: Cypress.env('longRunningTests'),
}
