/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsuariosController from '#controllers/Usuario/Main'
import UsuarioAuthController from '#controllers/Usuario/Auth'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.post('/usuarios', [UsuariosController, 'criar'])

router
  .group(() => {
    router.get('/usuarios/:id', [UsuariosController, 'findOne'])
    router.delete('/usuarios/:id', [UsuariosController, 'deletar'])
    router.put('/usuarios/:id', [UsuariosController, 'atualizar'])
    router.post('/usuarios/logout', [UsuarioAuthController, 'logout'])
  })
  .use(
    middleware.auth({
      guards: ['usuario'],
    })
  )

router.post('/usuarios/token', [UsuarioAuthController, 'login'])
