export default class PedidoPayload {
  declare subtotal: number
  declare data_recebimento: Date
  declare obs: string | null
  declare produtos: {
    id_produto: number
    quantidade: number
  }[]
}
