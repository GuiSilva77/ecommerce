import Usuario from '#models/usuario'
import UsuarioPayload from '../payloads/usuarioPayload.js'
import TelefoneService from './telefone_service.js'

export default class UsuarioService {
  constructor(protected telefoneService: TelefoneService) {}

  async encontrarPorCPF(cpf: string) {
    return await Usuario.findByOrFail('cpf', cpf)
  }

  async criar(usuario: UsuarioPayload) {
    if (await Usuario.findBy('cpf', usuario.cpf)) {
      throw new Error('Usuário já cadastrado')
    }

    let novoUsuario = new Usuario().merge(usuario)
    novoUsuario.related('telefones').createMany(usuario.telefones)

    return await Usuario.create(usuario)
  }

  async atualizar(cpf: string, carga: Partial<Usuario>) {
    if (!(await Usuario.findBy('cpf', cpf))) {
      throw new Error('Usuário não encontrado')
    }

    const usuario = await Usuario.findByOrFail('cpf', cpf)

    usuario.merge(carga)

    await usuario.save()
  }

  async deletar(cpf: string) {
    const usuario = await Usuario.findBy('cpf', cpf)

    return await usuario?.delete()
  }
}
