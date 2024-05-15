import vine from '@vinejs/vine'

export const criarPedidoValidador = vine.compile(
  vine.object({
    obs: vine.string().maxLength(255).nullable(),
    subtotal: vine.number().decimal(2).positive(),
    data_recebimento: vine.date(),
    produtos: vine
      .array(
        vine.object({
          id_produto: vine.number().positive(),
          quantidade: vine.number().min(1),
        })
      )
      .minLength(1),
  })
)
