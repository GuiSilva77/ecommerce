import VendaController from '#controllers/Venda/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/vendas', [VendaController, 'buscarVendas'])
    router.get('/vendas/:id', [VendaController, 'buscarVenda'])
    router.post('/vendas', [VendaController, 'criarVenda'])
    router.put('/vendas/:id', [VendaController, 'atualizarVenda'])
    router.delete('/vendas/:id', [VendaController, 'deletarVenda'])
  })
  .use(
    middleware.auth({
      guards: ['usuario', 'comerciante'],
    })
  )
