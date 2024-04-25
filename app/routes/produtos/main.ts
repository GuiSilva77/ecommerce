import ProdutosController from '#controllers/Produto/Main'
import router from '@adonisjs/core/services/router'

router.get('/produtos/:id', [ProdutosController, 'encontrarProdutoPorId'])
router.get('/comerciantes/:id/produtos', [ProdutosController, 'encontrarProdutos'])
router.post('/produtos', [ProdutosController, 'criarProduto'])
router.put('/produtos/:id', [ProdutosController, 'atualizarProduto'])
router.delete('/produtos/:id', [ProdutosController, 'deletarProduto'])
