/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsuariosController = () => import('#controllers/usuarios_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.post('/usuarios', [UsuariosController, 'criar'])

router
  .group(() => {
    router.get('/usuarios/:id', [UsuariosController, 'findOne'])
    router.delete('/usuarios/:id', [UsuariosController, 'deletar'])
    router.put('/usuarios/:id', [UsuariosController, 'atualizar'])
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
