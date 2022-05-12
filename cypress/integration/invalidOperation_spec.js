describe('Operation with wrong operators input', function(){
    it('Visit Calculator and div another div operator', function(){
       //Arrange
        cy.visit('index.html')
       //Act
       cy.get('#eight')
         .click()
         .get('[value="/"]')
         .click()
         .get('[value="/"]')
         .click()
         .get('#two')
         .click()
         .get('[value="="]')
         .click()
         .get('#result')
       //Assert
       cy.should('have.value','Operação inválida')

    })
    it('Visit Calculator div per zero', function(){
      //Arrange
       cy.visit('index.html')
      //Act
      cy.get('#nine')
        .click()
        .get('[value="/"]')
        .click()
        .get('#zero')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','Operação inválida divisão por zero')
    })
    it('Visit Calculator div and mult operator ', function(){
      //Arrange
      cy.visit('index.html')
      //Act
      cy.get('#nine')
        .click()
        .get('[value="/"]')
        .click()
        .get('[value="x"]')
        .click()
        .get('#three')
        .click()
        .get('[value="="]')
        .click()
        .get('#result')
      //Assert
      cy.should('have.value','Operação inválida')
    })
    it('Visit Calculator mult and div operator ', function(){
        //Arrange
        cy.visit('index.html')
        //Act
        cy.get('#nine')
          .click()
          .get('[value="x"]')
          .click()
          .get('[value="/"]')
          .click()
          .get('#three')
          .click()
          .get('[value="="]')
          .click()
          .get('#result')
        //Assert
        cy.should('have.value','Operação inválida')
      })
      it('Visit Calculator div and div operator ', function(){
        //Arrange
        cy.visit('index.html')
        //Act
        cy.get('[value="/"]')
          .click()
          .get('[value="/"]')
          .click()
          .get('[value="="]')
          .click()
          .get('#result')
        //Assert
        cy.should('have.value','Operação inválida')
      })
      it('Visit Calculator mult and mult operator ', function(){
        //Arrange
        cy.visit('index.html')
        //Act
        cy.get('[value="x"]')
          .click()
          .get('[value="x"]')
          .click()
          .get('[value="="]')
          .click()
          .get('#result')
        //Assert
        cy.should('have.value','Operação inválida')
      })
})