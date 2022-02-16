describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
    cy.contains(
      '10 HIGHLY CLICHED BUT STILL BRILLIANT BOOKS FOR BACKPACKERS Sarah Edwards'
    )
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })
})

describe('Login', function () {
  it('succeeds with correct credentials', function () {
    cy.get('#username').type('admin')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()

    cy.contains('John logged')
  })
})

describe('When logged in', function () {
  it('A blog can be created', function () {
    cy.contains('create blog').click()
    cy.get('#author').type('Gleb Bahmutov')
    cy.get('#title').type('Readable Cypress.io tests')
    cy.get('#url').type('https://glebbahmutov.com/blog/readable-tests/')
    cy.get('#create').click()

    cy.contains('Readable Cypress.io tests')
    cy.contains('Gleb Bahmutov')
  })
})
