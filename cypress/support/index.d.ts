// load type definitions from Cypress module
/// <reference types="cypress" />

import { User } from '../support/generate'

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

type ExploreFieldsAttributes = {
  label: string
  name: string | number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visite google page
     * @example cy.google()
     */
    google(): Chainable<Window>

    /**
     * Custom command to get element by data-cy values
     * @example cy.getByDataCy('selector')
     */
    getByDataCy(selector: string): Chainable<Element>

    /**
     * Custom command to get all fields by array parameter
     * @example cy.getFields(priceFields)
     */
    getFields(exploreFields: ExploreFieldsAttributes[]): Chainable<Element>

    /**
     * Custom command to get a specific game and add into the cart
     * @example cy.getGameCardAndAddIntoCart(priceFields)
     */
    getGameCardAndAddIntoCart(cardNumber: number): Chainable<Element>

    /**
     * Custom command to get a specific game and remove from the cart
     * @example cy.getGameCardAndRemoveFromCart(cardNumber)
     */
    getGameCardAndRemoveFromCart(cardNumber: number): Chainable<Element>

    /**
     * Custom command to get price of games greater than certain value
     * @example cy.getGamesGreaterThan(value)
     */
    getGamesGreaterThan(value: number): Chainable<Element>

    /**
     * Custom command to type all the fields from Form Sign up and submit
     * @example cy.signUp(user)
     */
    signUp(user: User): Chainable<Element>

    /**
     * Custom command to type all the fields from Form Sign in and submit
     * @example cy.signIn(email, password)
     */
    signIn(email: string, password: string): Chainable<Element>

    /**
     * Custom command to get price of games less than certain value
     * @example cy.getGamesLessThan(value)
     */
    getGamesLessThan(value: number): Chainable<Element>

    /**
     * Custom command to check banner in page and all it's content
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>

    /**
     * Custom command to check showcase in page and all it's content
     * @example cy.shouldRenderShowcase()
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>
  }
}
