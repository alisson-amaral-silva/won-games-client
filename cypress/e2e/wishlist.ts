/// <reference types="cypress" />


describe('Wishlist', () => {
  it('should add/remove games fro wishlist', () => {
    // acessar pagina de wishlist não logadas
    cy.visit('/wishlist')

    cy.wait(5000)

    // redirecionar para o sign-in
    cy.signIn()

    cy.wait(8000)

    // verifcar se a wishlist está vazia
    cy.findByRole('heading', { name: /Your wishlist is empty/i }).should('exist')

    // pegar um jogo e add na wishlist
    cy.getByDataCy('game-card').eq(0).within(() => {
      cy.findAllByLabelText(/add to wishlist/i).click()
    })


    cy.wait(5000)

    // verificar se o jogo está la
    cy.getByDataCy('wishlist').within(() => {
      cy.getByDataCy('game-card').should('have.length', 1)
    })


    cy.wait(5000)

    // remover esse jogo
    cy.getByDataCy('wishlist').within(() => {
      cy.findAllByLabelText(/remove from wishlist/i).click()
    })


    cy.wait(8000)

    //verificar se a wishlist está vazia
    cy.findByRole('heading', { name: /Your wishlist is empty/i }).should('exist')

  })
})
