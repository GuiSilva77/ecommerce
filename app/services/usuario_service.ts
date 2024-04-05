import Usuario from '#models/usuario'
import UsuarioPayload from '../entities/payload/usuario_payload.js'

export default class UsuarioService {
  async findOne(cpf: string) {
    return await Usuario.findByOrFail('cpf', cpf)
  }

  async create(usuario: UsuarioPayload) {
    return await Usuario.create(usuario)
  }

  async update(cpf: string, payload: Partial<Usuario>) {
    return await Usuario.updateOrCreate({ cpf: cpf }, payload)
  }

  async delete(cpf: string) {
    const usuario = await Usuario.findBy('cpf', cpf)

    return await usuario?.delete()
  }
}
