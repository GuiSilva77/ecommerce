import MainComercianteController from '#controllers/Comerciante/Main'
import router from '@adonisjs/core/services/router'

router.post('/comerciantes', [MainComercianteController, 'criar'])
