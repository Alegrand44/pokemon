describe("all functions", () => {
  it("pagina incial", () => {
    cy.viewport(1440, 861);

    // acessa a pagina de agentes
    cy.visit("http://localhost:3000/");
  });

  // preenche os dados
  it("digita nome do pokemon", () => {
    cy.viewport(1440, 861);

    cy.get("input[name=name]").type("blastoise");
  });

  it("procurar pokemons", () => {
    cy.viewport(1440, 861);
    // persistir dados
    cy.get("button").contains("Pesquisar").click();
  });

  it("Clica no primeiro pokemon", () => {
    cy.viewport(1440, 861);
    cy.wait(6000);
    cy.get("div[id=0]").click();
  });

  // verifica se redirecionou para pagina dos detalhes do pokemon
  it("Verifica se esta na pagina de detalhes", () => {
    cy.viewport(1440, 861);
    cy.url().should("include", "/pokemon");
  });

  // clica no botao do segundo ataque
  it("deve navegar pra details page", () => {
    cy.viewport(1440, 861);
    cy.get("button[id=1]").click();
  });

  // verifica se abriu modal com infos do ataque
  it("aparece modal com detalhes", () => {
    cy.viewport(1440, 861);
    cy.get("div[id=modal]");
  });
});
