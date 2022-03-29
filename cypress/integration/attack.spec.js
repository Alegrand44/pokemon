describe("Attack modal", () => {
  // seta viewport

  it("deve navegar pra details page", () => {
    cy.viewport(1440, 861);
    cy.visit("http://localhost:3000/pokemon/smp-SM109");
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
