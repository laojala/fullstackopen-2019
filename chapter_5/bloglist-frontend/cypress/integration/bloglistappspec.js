//start backend using npm run start:test

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'jokunen',
      password: 'salainen'
    }
    const blog = {

    }
    cy.request('POST', 'http://localhost:3003/api/users/', user).as('response')
    cy.visit('http://localhost:3000')

  })

  it('user sees their name after succesfull login', function() {
    cy.get('[data-testid=username]')
      .type('jokunen')
    cy.get('[data-testid=password]')
      .type('salainen')
    cy.contains('Test User').should('not.exist')
    cy.get('[data-testid=submitlogin]')
      .click()
    cy.contains('Logged in: Test User')
  })
  it('user sees notification for wrong username', function() {
    cy.get('[data-testid=username]')
      .type('blogger11')
    cy.get('[data-testid=password]')
      .type('kissakala')
    cy.contains('Incorrect username or password').should('not.exist')
    cy.get('[data-testid=submitlogin]')
      .click()
    cy.contains('Keen Test User').should('not.exist')
    cy.contains('Incorrect username or password')
  })
  it('user can post blog', function() {
    cy.get('[data-testid=username]')
      .type('jokunen')
    cy.get('[data-testid=password]')
      .type('salainen')
    cy.get('[data-testid=submitlogin]')
      .click()
    cy.contains('Add blog')
      .click()
    cy.get('[data-testid="title"]')
      .type('What Is JavaScript Made Of?')
    cy.get('[data-testid=author]')
      .type('Dan Abramov')
    cy.get('[data-testid=url]')
      .type('https://overreacted.io/what-is-javascript-made-of/')
    cy.get('[data-testid="0"]').should('not.be.visible')
    cy.get('[data-testid=submit_blog]')
      .click()
    cy.contains('Added blog "What Is JavaScript Made Of?"')
    cy.get('[data-testid="0"]').should('be.visible')
  })
  it.only('user can logout', function() {
    cy.get('[data-testid=username]')
      .type('jokunen')
    cy.get('[data-testid=password]')
      .type('salainen')
    cy.get('[data-testid=submitlogin]')
      .click()
    cy.contains('Blogs').should('exist')
    cy.get('[data-testid="logout_btn"]')
      .click()
    cy.contains('Blogs').should('not.exist')
    cy.get('[data-testid=submitlogin]').should('exist')
  })

})

