const sizes = ['iphone-6', 'ipad-2', [1024, 768]];

beforeEach(() => {
  cy.visit("/")
  
  });


describe("Login on page", () => {
  sizes.forEach((size) => {

    it(`page visible ${size}`, () => {
      cy.contains("Books list").should('be.visible');
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
    });
  
    it(`should login in success ${size}`, () => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
    });

    it(`should not login with empty mail ${size}`, () => {
      cy.login(null, "123"); 
      cy.get("#mail").then((elements) => {
        expect(elements[0].checkValidity()).be.false
        expect(elements[0].validationMessage).contains("Заполните это поле")
        });
    });
     

    it(`should not login with empty pass ${size}`, () => {
      cy.login("bropet@mail.ru", null); 
      cy.get("#pass").then((elements) => {
        expect(elements[0].checkValidity()).be.false
        expect(elements[0].validationMessage).contains("Заполните это поле")
      });
    })
  });
});

describe("BooksApp tests", () => {
  beforeEach(() => {
    cy.login("bropet@mail.ru", "123");
  });
  sizes.forEach((size) => {

    it(`should add new books ${size}`, () => {
      cy.addBook("Book_1", "Author_1");
      cy.contains("Book_1").should("be.visible");

      cy.addBook("Book_2", "Author_2");
      cy.contains("Book_2").should("be.visible");
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
    });

    it(`should add a book to favorites ${size}`, () => {
      cy.addBook("Book_1", "Author_1");
      cy.contains("Add to favorite").first().click();
      cy.contains("Favorites").click();
      cy.contains("Delete from favorite").first().should("be.visible");
    });

    it(`should delete the book from favorites ${size}`, () => {
      cy.addBook("Book_1", "Author_1");
      cy.contains("Add to favorite").first().click();
      cy.contains("Favorites").click();
      cy.contains("Delete from favorite").first().click();
      cy.contains("Please add some book to favorit on home page!").should("be.visible");
    });
  })
})

