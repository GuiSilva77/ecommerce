import AuthComercianteController from '#controllers/Comerciante/Auth'
import MainComercianteController from '#controllers/Comerciante/Main'
import router from '@adonisjs/core/services/router'

router.post('/comerciantes', [MainComercianteController, 'criar'])
router.get('/comerciantes/:id', [MainComercianteController, 'index'])
//TODO: GET /comerciantes/{cidade}-{estado}
router.post('/comerciantes/auth', [AuthComercianteController, 'criar'])
router.put('/comerciantes', [MainComercianteController, 'alterar'])
router.delete('/comerciantes', [MainComercianteController, 'deletar'])
