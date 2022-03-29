describe("Procurar pokemon", () => {
  it("Acessar pagina inicial", () => {
    // acessa a pagina de agentes
    cy.visit("http://localhost:3000/");
  });

  // preenche os dados
  it("digita parte do nome do pokemon", () => {
    cy.get("input[name=name]").type("pik");
  });

  it("procurar pokemons ", () => {
    // persistir dados
    cy.get("button").contains("Pesquisar").click();
  });
});
