import PedidosController from '#controllers/Pedido/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/pedidos/:id', [PedidosController, 'buscarPedidoPorId'])
    router.get('/usuarios/:id/pedidos', [PedidosController, 'buscarPedidosPorUsuario'])
    router.post('/pedidos', [PedidosController, 'criarPedido'])
    router.delete('/pedidos/:id', [PedidosController, 'deletarPedido'])
  })
  .use(
    middleware.auth({
      guards: ['usuario'],
    })
  )

router
  .group(() => {
    router.get('/comerciantes/:id/pedidos', [PedidosController, 'buscarPedidosPorComerciante'])
  })
  .use(
    middleware.auth({
      guards: ['comerciante'],
    })
  )
