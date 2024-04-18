import UsuarioService from '#services/usuario_service'
import { criarValidator, encontrarValidator } from '#validators/usuario'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsuariosController {
  constructor(protected usuarioService: UsuarioService) {}

  async findOne({ request, response }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)
    const result = await this.usuarioService.encontrarPorCPF(data.cpf)

    return response.ok(result)
  }

  async criar({ request, response }: HttpContext) {
    const data = await request.validateUsing(criarValidator)
    const result = await this.usuarioService.criar(data)

    return response.created(result)
  }

  async deletar({ request, response }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)
    const result = await this.usuarioService.deletar(data.cpf)

    return response.ok(result)
  }

  async atualizar({ request, response }: HttpContext) {
    const data = await request.validateUsing(encontrarValidator)
    const result = await this.usuarioService.deletar(data.cpf)

    return response.ok(result)
  }
}
