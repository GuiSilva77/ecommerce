import AvaliacoesController from '#controllers/Avaliacao/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/usuarios/:id/avaliacoes', [AvaliacoesController, 'buscarAvaliacoesPorUsuario'])
    router.get('/comerciantes/:id/avaliacoes', [
      AvaliacoesController,
      'buscarAvaliacoesPorComerciante',
    ])
    router.post('/avaliacoes', [AvaliacoesController, 'criarAvaliacao'])
    router.delete('/avaliacoes/:id', [AvaliacoesController, 'deletarAvaliacao'])
    router.patch('/avaliacoes/:id', [AvaliacoesController, 'atualizarAvaliacao'])
  })
  .use(
    middleware.auth({
      guards: ['usuario'],
    })
  )
