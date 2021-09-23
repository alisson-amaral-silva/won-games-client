/// <reference types="cypress" />


describe('Wishlist', () => {
  it('should add/remove games fro wishlist', () => {
    // acessar pagina de wishlist não logadas
    cy.visit('/wishlist')

    // redirecionar para o sign-in
    cy.signIn()

    // verifcar se a wishlist está vazia
    cy.findByRole('heading', { name: /Your wishlist is empty/i }).should('exist')

    // pegar um jogo e add na wishlist
    cy.getByDataCy('game-card').eq(0).within(() => {
      cy.findAllByLabelText(/add to wishlist/i).click()
    })

    // verificar se o jogo está la
    cy.getByDataCy('wishlist').within(() => {
      cy.getByDataCy('game-card').should('have.length', 1)
    })

    // remover esse jogo
    cy.getByDataCy('wishlist').within(() => {
      cy.findAllByLabelText(/remove from wishlist/i).click()
    })

    //verificar se a wishlist está vazia
    cy.findByRole('heading', { name: /Your wishlist is empty/i }).should('exist')

  })
})
