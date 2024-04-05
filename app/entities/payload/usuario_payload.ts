import Usuario from '#models/usuario'

export default class UsuarioPayload {
  declare nome: string

  declare img_url: string

  declare cpf: string

  declare data_mod: DateTime

  declare ativo: boolean

  declare validado: boolean

  declare senha: string

  declare enderecos: Array<string>

  declare telefones: Array<string>

  toModel() {
    return new Usuario()
  }
}
