describe('Adicionar produto ao carrinho', () => {
    it('deve adicionar cartão Auto ao carrinho com sucesso', () => {
      cy.visit('https://www.vr.com.br')

     // Ao clicar em algum link ou botão, será mantido na mesma aba
     // Obs: Quando clica no botão abaixo 'Compre online', é direcionado para uma nova aba e acaba falhando o teste)
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url
        })
      })
  
      cy.contains('Compre online').click()

      cy.contains('Soluções VR').click()
      
      // Gera um número aleatório de 1 a 300
      const quantidadeAleatorio = Math.floor(Math.random() * 300) + 1
      cy.get('#produto-auto-quantidade').clear().type(quantidadeAleatorio.toString())
      
      // Gera um valor aleatório de 1,00 a 9.999,99
      const valorProduto = (Math.random() * (9999.99 - 1) + 1).toFixed(2);
      cy.get('#produto-auto-valor').clear().type(valorProduto.toString())

      cy.get('#btn-adicionar-carrinho-auto').click()
      
      cy.get('.cart-button__badge').should('exist')
      cy.get('.product-in-cart-view__content').contains('Produto adicionado!')
    })
  })
  