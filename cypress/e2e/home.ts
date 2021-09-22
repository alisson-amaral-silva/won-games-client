/// <reference types="cypress" />

describe('Home Page', () => {
  it('should render home page sections', () => {
    //visitar a pagina
    cy.visit('/')

    cy.shouldRenderBanner()
  })
})
