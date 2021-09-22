// load type definitions from Cypress module
/// <reference types="cypress" />

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
     * Custom command to get price of games greater than certain value
     * @example cy.getFields(priceFields)
     */
     getGamesGreaterThan(value: number): Chainable<Element>

     /**
     * Custom command to get price of games less than certain value
     * @example cy.getFields(priceFields)
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
