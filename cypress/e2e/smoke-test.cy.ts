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
    cy.request('sounds/ui_hacking_charscroll.wav')
      .its('status')
      .should('eq', 200)
  })
})

describe('Verificação de Assets Reais', () => {
  // it('Deve carregar o som de digitação diretamente via URL completa', () => {
  //   // Usamos a baseUrl para garantir que o request saiba exatamente "em qual prédio" buscar
  //   const soundPath =
  //     'http://localhost:5173/fallout/sounds/ui_hacking_charscroll.wav'

  //   cy.request(soundPath).then(response => {
  //     expect(response.status).to.eq(200)
  //   })
  // })

  it('Deve carregar o som de digitação e garantir que é um áudio', () => {
    // Usamos a URL completa para não ter erro de "qualified URL"
    const soundUrl =
      'http://localhost:5173/fallout/sounds/ui_hacking_charscroll.wav'

    cy.request({
      url: soundUrl,
      failOnStatusCode: false // Impede o Cypress de travar antes do nosso assert
    }).then(response => {
      // 1. Verifica se o arquivo foi encontrado (200) e não é um erro (404)
      expect(response.status).to.eq(200)

      // 2. Verifica se o que voltou é REALMENTE um áudio
      // Note: usamos .wav no seu arquivo, então o tipo pode ser audio/wav ou audio/x-wav
      expect(response.headers['content-type']).to.match(
        /audio\/(mpeg|wav|x-wav)/
      )
    })
  })
})
