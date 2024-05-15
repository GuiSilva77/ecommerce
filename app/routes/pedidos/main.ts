import PedidosController from '#controllers/Pedido/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/pedidos', [PedidosController, 'criarPedido'])
  })
  .use(
    middleware.auth({
      guards: ['usuario'],
    })
  )
