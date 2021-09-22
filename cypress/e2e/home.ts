/// <reference types="cypress" />

describe('Home Page', () => {
  it('should render home page sections', () => {
    //visitar a pagina
    cy.visit('/')

    cy.shouldRenderBanner()

    cy.shouldRenderShowcase({name: 'New Games', highlight: false})
    cy.shouldRenderShowcase({name: 'Most Popular Games', highlight: true})
    cy.shouldRenderShowcase({name: 'Upcoming Games', highlight: true})
    cy.shouldRenderShowcase({name: 'Free Games', highlight: true})
  })
})
