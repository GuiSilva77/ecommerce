import UsuarioService from '#services/usuario_service'
import { atualizarValidator, criarValidator } from '#validators/usuario'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsuariosController {
  constructor(protected usuarioService: UsuarioService) {}

  async findOne({ request, response, auth }: HttpContext) {
    let id: bigint
    const linhaDeBusca = request.only(['self'])

    if (linhaDeBusca && linhaDeBusca.self == 'true')
      id = auth.getUserOrFail().currentAccessToken.tokenableId as bigint
    else id = request.param('id')

    const result = await this.usuarioService.encontrarPorId(id)

    return response.ok(result)
  }

  async criar({ request, response }: HttpContext) {
    const data = await request.validateUsing(criarValidator)
    const result = await this.usuarioService.criar(data)

    return response.created(result)
  }

  async deletar({ request, response }: HttpContext) {
    const id = await request.param('id')
    const result = await this.usuarioService.deletar(id)

    return response.ok(result)
  }

  async atualizar({ request, response }: HttpContext) {
    const id = await request.param('id')

    const data = await request.validateUsing(atualizarValidator)
    const result = await this.usuarioService.atualizar(id, data)

    return response.ok(result)
  }
}
