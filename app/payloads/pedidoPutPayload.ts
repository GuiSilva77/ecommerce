export default class PedidoPutPayload {
  declare subtotal: number | undefined
  declare data_recebimento: Date | undefined
  declare obs: string | undefined
  declare produtos:
    | {
        id_produto: number
        quantidade: number
      }[]
    | undefined
}
