// load type definitions from Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visite google page
     * @example cy.google()
     */
    google(): Chainable<Window>
  }
}
