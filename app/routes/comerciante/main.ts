import AuthComercianteController from '#controllers/Comerciante/Auth'
import ComercianteImagesController from '#controllers/Comerciante/Images'
import MainComercianteController from '#controllers/Comerciante/Main'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.post('/comerciantes', [MainComercianteController, 'criar'])
router.get('/comerciantes/:id', [MainComercianteController, 'index'])
router.post('/comerciantes/auth', [AuthComercianteController, 'criar'])
router.put('/comerciantes', [MainComercianteController, 'alterar'])
router.delete('/comerciantes', [MainComercianteController, 'deletar'])
router.delete('/comerciantes/auth', [AuthComercianteController, 'deletar']).use(middleware.auth({guards:['comerciante']}))
router.put('/comerciantes/banner', [ComercianteImagesController, 'update']).use(middleware.auth({guards:['comerciante']}))

