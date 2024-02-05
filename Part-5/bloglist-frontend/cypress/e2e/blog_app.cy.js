describe('Blog app', function () {

  beforeEach( function () {
    cy.request( 'POST', Cypress.env('BACKEND') + '/testing/reset')

    const user = {
      username: 'alex',
      name: 'Alex Dill',
      password: 'test'
    }
    cy.request( 'POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit( '')
  })

  it( 'login form is shown', function () {
    cy.contains('blogs')
    cy.get('#loginForm')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
  })

  describe( 'Login', function () {

    it( 'succeeds with correct credentials', function () {
      cy.get('input[ name= "username"]').type('alex')
      cy.get('input[ name="password" ]').type('test')
      cy.contains('login').click()
      cy.contains('Alex Dill logged in')
    })

    it( 'fails with wrong credentials', function () {
      cy.get('input[ name="username"]').type('gary')
      cy.get('input[ name="password"]').type('test')
      cy.contains('login').click()
      cy.get('.error')
        .should('contains', /wrong username or password/i)
        .and('have.css', 'color', 'rgb(212, 2, 2)')
    })
  })

  describe( 'When loged in', function() {

    beforeEach( function () {
      cy.login('alex', 'test')

      cy.contains('Alex Dill logged in')
    })

    it( 'a blog can be created', function () {
      cy.createBlog( 'This is a new blog with cypress', 'Author', 'www.algo.com' )
      cy.contains('a new blog This is a new blog with cypress by Author added')
      cy.get('.blogAtStart')
        .should('contain', 'This is a new blog with cypress Author')
        .and('contain', 'show')
    })
    describe( 'In a blog', function () {

      beforeEach( function () {
        cy.createBlog( 'This is a new blog with cypress', 'Author', 'www.algo.com' )
      })

      it( 'can like a blog', function () {
        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('like').click()
        cy.get('.blog').contains('likes1')
      })

      it( 'user that create blog can be delete', function () {
        cy.visit('')
        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('remove').click()
      })

      it( 'user different from the blog creator cannot remove the blog', function () {
        cy.contains('logout').click()
        const username = 'dylan'
        const name = 'Dylan Hill'
        const password = 'test'
        cy.createUser(username, name, password)
        cy.login(username, password)

        cy.get('.blog').contains('show').click()
        cy.get('.blog').contains('remove').should('not.exist')
      })
    })

    describe( 'With multiple blogs', function () {

      beforeEach( function () {
        cy.createBlog('first blog with most likes', 'someone1', 'url1')
        cy.createBlog('second blog with most likes', 'someone2', 'url2')
        cy.createBlog('third blog with most likes', 'someone3', 'url3')
        cy.createBlog('fourth blog with most likes', 'someone4', 'url4')
        cy.get('.notification').should('not.exist')
      })

      it( 'blogs ordered decresingly according to their likes', function () {
        cy.multipliLikes( 5, 'first blog with most likes' )
        cy.multipliLikes( 4, 'second blog with most likes' )
        cy.multipliLikes( 3, 'third blog with most likes' )
        cy.multipliLikes( 2, 'fourth blog with most likes' )

        cy.get('.blog').eq(0).should('contain', 'first blog with most likes')
        cy.get('.blog').eq(1).should('contain', 'second blog with most likes')
        cy.get('.blog').eq(2).should('contain', 'third blog with most likes')
        cy.get('.blog').eq(3).should('contain', 'fourth blog with most likes')
      })
    })
  })
})