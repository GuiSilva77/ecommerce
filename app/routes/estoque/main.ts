/**
 * GET /estoque/lancamentos?produtoIds=1,2,3&filtro='venda' ou '!venda', 'entrada' ou '!entrada', 'saida' ou '!saida'
 * GET /estoque/lancamentos/:id
 *
 * POST /estoque/lancamentos
 * PUT /estoque/lancamentos/:id
 * DELETE /estoque/lancamentos/:id
 *
 * GET /estoque/produtos?produtoIds=1,2,3&filtro='venda' ou '!venda'
 * GET /estoque/produtos/:id
 * GET /estoque/produtos/:id/lancamentos?filtro='venda' ou '!venda'
 *
 */

import EstoqueController from '#controllers/Estoque/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/estoque/lancamentos', [EstoqueController, 'buscarLancamentos'])
    router.get('/estoque/lancamentos/:id', [EstoqueController, 'buscarLancamentoPorId'])
    router.post('/estoque/lancamentos', [EstoqueController, 'criarLancamento'])
    router.put('/estoque/lancamentos/:id', [EstoqueController, 'atualizarLancamento'])
    router.delete('/estoque/lancamentos/:id', [EstoqueController, 'deletarLancamento'])

    router.get('/estoque/produtos', [EstoqueController, 'buscarStatusDeProdutos'])
    router.get('/estoque/produtos/:id', [EstoqueController, 'buscarStatusDeProdutoPorId'])
    router.get('/estoque/produtos/:id/lancamentos', [
      EstoqueController,
      'buscarLancamentosDeProdutoPorId',
    ])
  })
  .use(
    middleware.auth({
      guards: ['comerciante'],
    })
  )
