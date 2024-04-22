import SessaoController from '#controllers/Sessao/Main'
import { middleware } from '#start/kernel'

import router from '@adonisjs/core/services/router'

router.post('/auth/login', [SessaoController, 'login'])
router.post('/auth/logout', [SessaoController, 'logout']).use(middleware.auth({ guards: ['api'] }))
