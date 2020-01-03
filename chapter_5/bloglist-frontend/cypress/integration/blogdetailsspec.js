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
  
  })
  
  it('likes count increases when liked', function() {
    cy.get('[data-testid="0"] > div span[data-testid="author"]')
      .click()
    cy.get('[data-testid="0"] > div:nth-child(2) > div span[data-testid="likes"]').invoke('text').then(($likes) => {
      cy.log("number_before:", $likes)
      cy.get('[data-testid="0"] > div:nth-child(2) > div button[data-testid="like_btn"]')
        .click()
      cy.get('[data-testid="0"] > div:nth-child(2) > div span[data-testid="likes"]').contains(Number($likes)+1)
      //wait is not nice here, but will do for now cy.wait(1000)
      cy.get('[data-testid="0"] > div:nth-child(2) > div span[data-testid="likes"]').invoke('text').then((str) => Number(str))
        .should("eq", Number($likes)+1)
    })

  })

})