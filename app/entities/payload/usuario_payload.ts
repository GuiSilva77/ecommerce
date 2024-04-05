export default class UsuarioPayload {
  declare nome: string

  declare img_url: string

  declare cpf: string

  declare data_mod: Date

  declare ativo: boolean

  declare validado: boolean

  declare senha: string

  declare enderecos: Array<string>

  declare telefones: Array<string>
}
