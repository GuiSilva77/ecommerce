export default class UsuarioPutPayload {
  declare nome: string | undefined
  declare email: string | undefined
  declare senha: string | undefined
  declare cpf: string | undefined
  declare telefones: { numero: string; tipo: 'CELULAR' | 'FIXO' }[] | undefined
  declare ativo: boolean | undefined
  declare validado: boolean | undefined
  /*declare enderecos:
    | {
        rua: string
        numero: string
        bairro: string
        cidade: string
        estado: string
        cep: string
        tipo: 'RESIDENCIAL' | 'COMERCIAL' | 'CASA' | 'TRABALHO'
      }[]
    | undefined*/
}
