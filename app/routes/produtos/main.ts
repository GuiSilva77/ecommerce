import ProdutosController from '#controllers/Produto/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/produtos/:id', [ProdutosController, 'encontrarProdutoPorId'])
router.get('/comerciantes/:id/produtos', [ProdutosController, 'encontrarProdutos'])
router.get('/produtos/:id/categorias', [ProdutosController, 'listarCategoria'])

router
  .group(() => {
    router.post('/produtos', [ProdutosController, 'criarProduto'])
    router.put('/produtos/:id', [ProdutosController, 'atualizarProduto'])
    router.delete('/produtos/:id', [ProdutosController, 'deletarProduto'])
  })
  .use(
    middleware.auth({
      guards: ['comerciante', 'usuario'],
    })
  )
