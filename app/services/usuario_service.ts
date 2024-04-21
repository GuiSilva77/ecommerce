import Usuario from '#models/usuario'
import { inject } from '@adonisjs/core'
import UsuarioPayload from '../payloads/usuarioPayload.js'
import TelefoneService from './telefone_service.js'
import UsuarioPatchPayload from '../payloads/usuarioPatchPayload.js'
import hash from '@adonisjs/core/services/hash'

@inject()
export default class UsuarioService {
  constructor(protected telefoneService: TelefoneService) {}

  async encontrarPorId(id: bigint | undefined) {
    return await Usuario.findByOrFail('id_usuario', id)
  }

  async criar(usuario: UsuarioPayload) {
    let novoUsuario = new Usuario().merge(usuario)
    novoUsuario.related('telefones').createMany(usuario.telefones)

    novoUsuario.senha = await hash.make(usuario.senha)

    return await Usuario.create(usuario)
  }

  async atualizar(id: bigint, carga: UsuarioPatchPayload) {
    const usuario = await Usuario.findByOrFail('id_usuario', id)

    usuario.merge(carga)
    if (usuario.telefones && usuario.telefones.length > 0) {
      usuario.related('telefones').updateOrCreateMany(usuario.telefones)
    }
    await usuario.save()
  }

  async deletar(id: bigint) {
    const usuario = await Usuario.findByOrFail('id_usuario', id)

    return await usuario?.delete()
  }
}
