import Usuario from '#models/usuario'

export default class UsuarioService {
  async encontrarPorCPF(cpf: string) {
    return await Usuario.findByOrFail('cpf', cpf)
  }

  async criar(usuario: Partial<Usuario>) {
    return await Usuario.create(usuario)
  }

  async atualizar(cpf: string, carga: Partial<Usuario>) {
    return await Usuario.updateOrCreate({ cpf: cpf }, carga)
  }

  async deletar(cpf: string) {
    const usuario = await Usuario.findBy('cpf', cpf)

    return await usuario?.delete()
  }
}
