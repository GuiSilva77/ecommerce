import vine from '@vinejs/vine'

export const atualizarPedidoValidador = vine.compile(
  vine.object({
    obs: vine.string().maxLength(255).optional(),
    subtotal: vine.number().decimal(2).positive().optional(),
    data_recebimento: vine.date().optional(),
    produtos: vine
      .array(
        vine.object({
          id_produto: vine.number().positive(),
          quantidade: vine.number().min(1),
        })
      )
      .minLength(1)
      .optional(),
  })
)
