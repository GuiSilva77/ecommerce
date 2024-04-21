const AvaliacoesController = () => import('#controllers/avaliacoes_controller')
import router from '@adonisjs/core/services/router'

router.get('/avaliacoes', [AvaliacoesController, 'encontrarAvaliacoesPaginadas'])
router.post('/avaliacoes', [AvaliacoesController, 'criarAvaliacao'])
router.delete('/avaliacoes', [AvaliacoesController, 'deletarAvaliacao'])
router.patch('/avaliacoes', [AvaliacoesController, 'atualizarAvaliacao'])
