describe("Ticket Booking UI flow", () => {
  it("logs in and adds ticket to cart", () => {
    cy.visit("/index.html");

    cy.get("#email").type("demo@ticketapp.local");
    cy.get("#password").type("demo123");
    cy.get("#loginForm button[type='submit']").click();

    cy.url().should("include", "/products.html");

    cy.get("#productGrid .card").first().within(() => {
      cy.get("input[type='number']").clear().type("2");
      cy.get("button").contains("Tambah").click();
    });

    cy.contains("Keranjang").click();
    cy.url().should("include", "/cart.html");
    cy.get("#cartItems li").should("have.length.at.least", 1);
  });
});
