import vine from '@vinejs/vine'

export const atualizarEntradaValidador = vine.compile(
  vine.object({
    quantidade: vine.number().min(1).optional(),
    produtoId: vine.number().positive().optional(),
    validade: vine.date().optional(),
    lote: vine.string().optional(),
  })
)
