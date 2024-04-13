import UsuarioService from '#services/usuario_service'
import { criarValidator, encontrarValidator } from '#validators/usuario'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsuariosController {
  constructor(protected usuarioService: UsuarioService) {}

  async findOne({ request }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)
    return await this.usuarioService.encontrarPorCPF(data.cpf)
  }

  async criar({ request }: HttpContext) {
    const data = await request.validateUsing(criarValidator)
    return await this.usuarioService.criar(data)
  }

  async deletar({ request }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)

    return await this.usuarioService.deletar(data.cpf)
  }

  async atualizar({ request }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)

    return await this.usuarioService.deletar(data.cpf)
  }
}
