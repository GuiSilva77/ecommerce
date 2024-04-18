export default class UsuarioPayload {
  declare nome: string
  declare email: string
  declare senha: string
  declare cpf: string
  declare telefones: { numero: string; tipo: 'CELULAR' | 'FIXO' }[]
}
