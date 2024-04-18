/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsuariosController = () => import('#controllers/usuarios_controller')
import router from '@adonisjs/core/services/router'

router.get('/usuario/:id', [UsuariosController, 'findOne'])
router.post('/usuario', [UsuariosController, 'criar'])
router.delete('/usuario', [UsuariosController, 'deletar'])
router.patch('/usuario', [UsuariosController, 'atualizar'])
