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

router.get('/usuarios/:id', [UsuariosController, 'findOne'])
router.post('/usuarios', [UsuariosController, 'criar'])
router.delete('/usuarios/:id', [UsuariosController, 'deletar'])
router.put('/usuarios/:id', [UsuariosController, 'atualizar'])
