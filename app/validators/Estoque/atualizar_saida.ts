import vine from '@vinejs/vine'

export const atualizarSaidaValidador = vine.compile(
  vine.object({
    quantidade: vine.number().min(1).optional(),
    lote: vine.string().optional(),
    produtoId: vine.number().positive().optional(),
    motivo: vine.string().nullable().optional(),
    vendaId: vine.number().nullable().optional(),
  })
)
