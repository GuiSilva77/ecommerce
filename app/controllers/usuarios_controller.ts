import UsuarioService from '#services/usuario_service'
import { criarValidator, findOneValidator } from '#validators/usuario'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsuariosController {
  constructor(protected usuarioService: UsuarioService) {}

  async findOne({ request }: HttpContext) {
    const data = await request.validateUsing(findOneValidator)
    return await this.usuarioService.findOne(data.cpf)
  }

  async criar({ request }: HttpContext) {
    const data = await request.validateUsing(criarValidator)
    return await this.usuarioService.create(data)
  }

  async deletar({ request }: HttpContext) {
    const data = await request.validateUsing(findOneValidator)

    return await this.usuarioService.delete(data.cpf)
  }

  async atualizar({ request }: HttpContext) {
    const data = await request.validateUsing(findOneValidator)

    return await this.usuarioService.delete(data.cpf)
  }
}
