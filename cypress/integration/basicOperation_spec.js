describe('Basic Operation of math', function(){
    it('Visit Calculator and sum values', function(){
       //Arrange
        cy.visit('index.html')
       //Act
       cy.get('#one')
         .click()
         .get('[value="+"]')
         .click()
         .get('#two')
         .click()
         .get('[value="="]')
         .click()
         .get('#result')
       //Assert
       cy.should('have.value','3')

    })
    it('Visit Calculator and sub values', function(){
      //Arrange
      cy.visit('index.html')
      //Act
      cy.get('#one')
        .click()
        .get('#three')
        .click()
        .get('[value="-"]')
        .click()
        .get('#one')
        .click()
        .get('#four')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','-1')
    })
    it('Visit Calculator and mult values', function(){
      //Arrange
      cy.visit('index.html')
      //Act
      cy.get('#one')
        .click()
        .get('#nine')
        .click()
        .get('[value="x"]')
        .click()
        .get('#five')
        .click()
        .get('#four')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','1026')
    })
    it('Visit Calculator and div values', function(){
      //Arrange
      cy.visit('index.html')
      //Act
      cy.get('#one')
        .click()
        .get('#zero')
        .click()
        .get('[value="/"]')
        .click()
        .get('#five')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','2')
    })
    it('Visit Calculator and div values', function(){
      //Arrange
      cy.visit('index.html')
      //Act
      cy.get('[value="-"]')
        .click()
        .get('#six')
        .click()
        .get('[value="x"]')
        .click()
        .get('[value="-"]')
        .click()
        .get('#six')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','36')
    })
})