describe('Fallout Terminal - Smoke Test', () => {
  // Ajustamos a baseUrl para incluir o caminho que o Vite exige
  const baseUrl = 'http://localhost:5173/fallout/'

  it('Deve carregar a página inicial e os recursos críticos', () => {
    // 1. Visita o site usando a base correta
    cy.visit(baseUrl)

    // 2. Verifica se o título principal está visível
    cy.contains('ROBCO INDUSTRIES').should('be.visible')

    // 3. Teste de QA: Verifica o som SEM a barra inicial (para ser relativo à baseUrl)
    // Se a baseUrl termina em /fallout/, o request abaixo busca em /fallout/sounds/...
    cy.request('sounds/terminal_typing.mp3').its('status').should('eq', 200)
  })
})

describe('Verificação de Assets Reais', () => {
  it('Deve carregar o som de digitação diretamente via URL completa', () => {
    // Usamos a baseUrl para garantir que o request saiba exatamente "em qual prédio" buscar
    const soundPath = 'http://localhost:5173/fallout/sounds/terminal_typing.mp3'

    cy.request(soundPath).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
