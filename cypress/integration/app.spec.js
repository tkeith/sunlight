describe('Navigation', () => {
  it('navigate to somewhere', () => {
    // Start from the index page
    cy.visit('http://localhost:8000/somewhere')

    // The new url should include "/about"
    cy.url().should('include', '/somewhere')

    // The new page should contain an h1 with "About page"
    cy.get('body').contains('hello from somewhere')
  })
})
