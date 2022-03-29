describe("Details page", () => {
  it("Acessa pagina inicial", () => {
    cy.viewport(1440, 861);
    cy.visit("http://localhost:3000/");
  });

  // clica no primeiro pokemon da pagina
  it("Clica no primeiro pokemon", () => {
    cy.viewport(1440, 861);
    cy.get("div[id=1]").click();
  });

  // verifica se redirecionou para pagina dos detalhes do pokemon
  it("Verifica se esta na pagina de detalhes", () => {
    cy.viewport(1440, 861);
    cy.url().should("include", "/pokemon");
  });
});
