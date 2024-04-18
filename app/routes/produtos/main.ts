const ProdutosController = () => import('#controllers/produtos_controller')

import router from '@adonisjs/core/services/router'

router.get('/produto/:id', [ProdutosController, 'encontrarProdutoPorId'])
router.get('/comerciante/:id/produtos', [ProdutosController, 'encontrarProdutos'])
router.post('/produto', [ProdutosController, 'criarProduto'])
router.patch('/produto/:id', [ProdutosController, 'atualizarProduto'])
router.delete('/produto/:id', [ProdutosController, 'deletarProduto'])
