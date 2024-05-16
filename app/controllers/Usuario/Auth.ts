import SessaoService from '#services/sessao_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsuarioAuthController {
  constructor(protected sessaoService: SessaoService) {}

  async login({ request, response }: HttpContext) {
    const { email, senha } = request.only(['email', 'senha'])

    const token = await this.sessaoService.login(email, senha)

    return response.ok(token)
  }

  async logout({ response }: HttpContext) {
    await this.sessaoService.logout()

    return response.ok({ message: 'Usuário deslogado com sucesso' })
  }
}
