import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Usuario from '#models/usuario'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SessaoService {
  constructor(protected ctx: HttpContext) {}

  async login(email: string, senha: string) {
    const usuario = await Usuario.verifyCredentials(email, senha)

    const token = await Usuario.accessTokens.create(usuario)

    return token
  }

  async logout() {
    const id_usuario = this.ctx.auth.user?.id_usuario

    const usuario = await Usuario.find(id_usuario)
    if (!usuario) {
      throw new ResourceNotFoundException('Usuário não encontrado')
    }

    const id_token = await this.ctx.auth.user?.currentAccessToken.identifier
    if (!id_token) {
      throw new ResourceNotFoundException('Token não encontrado')
    }

    await Usuario.accessTokens.delete(usuario, id_token)
  }
}
