const AvaliacoesController = () => import('#controllers/avaliacoes_controller')
import router from '@adonisjs/core/services/router'

router.get('/avaliacoes', [AvaliacoesController, 'encontrarAvaliacoesPaginadas'])
router.post('/avaliacao', [AvaliacoesController, 'criarAvaliacao'])
router.delete('/avaliacao', [AvaliacoesController, 'deletarAvaliacao'])
router.patch('/avaliacao', [AvaliacoesController, 'atualizarAvaliacao'])
