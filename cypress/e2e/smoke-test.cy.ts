describe('Fallout Terminal - Smoke Test', () => {
  const baseUrl = 'http://localhost:5173/' // URL padrão do Vite

  it('Deve carregar a página inicial e os recursos críticos', () => {
    // 1. Visita o site
    cy.visit(baseUrl)

    // 2. Verifica se o título principal está visível
    cy.contains('ROBCO INDUSTRIES').should('be.visible')

    // 3. Teste de QA para o erro de som (404) que você teve
    // Isso verifica se o arquivo de áudio retorna status 200 (OK)
    cy.request('/sounds/terminal_typing.mp3').its('status').should('eq', 200)
  })
})

describe('Verificação de Assets Reais', () => {
  it('Deve carregar o som de digitação sem erros de rede', () => {
    // Intercepta a requisição do som para monitorar o status
    cy.request('/sounds/terminal_typing.mp3').then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
