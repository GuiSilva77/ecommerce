import TransacaoController from '#controllers/Transacao/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/transacoes/:id', [TransacaoController, 'buscarTransacaoPorId'])
    router.post('/transacoes', [TransacaoController, 'criarTransacao'])
    router.put('/transacoes/:id', [TransacaoController, 'atualizarTransacao'])
    router.delete('/transacoes/:id', [TransacaoController, 'deletarTransacao'])
  })
  .use(
    middleware.auth({
      guards: ['usuario', 'comerciante'],
    })
  )
