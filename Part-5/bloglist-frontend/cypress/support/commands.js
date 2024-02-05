// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('createUser', (username, name, password) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, { username, name, password })
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(  ({ body }) => {
    window.localStorage.setItem('userBlogLogged', JSON.stringify(body))
  })
  cy.visit('')
})

Cypress.Commands.add('createBlog', (title, author, url) => {
  cy.get('.newblogBtn').click()
  cy.get('input[ name="title" ]').type(title)
  cy.get('input[ name="author" ]').type(author)
  cy.get('input[ name="url" ]').type(url)
  cy.get('button[ type="submit" ]').click()
})

Cypress.Commands.add('multipliLikes', (numberLikes, titleBlog) => {
  cy.contains(titleBlog).parent().as('blog')
  cy.get('@blog').contains('show').click()
  cy.get('@blog').find('.likeBtn').as('likeBtn')
  //cy.get('.likeBtn').as('likeBtn')

  for (let i = 0; i <= numberLikes; i++) {
    cy.get('@likeBtn').click()
    cy.get('@blog').should('contain', `likes${ i+1 }`)
  }
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })