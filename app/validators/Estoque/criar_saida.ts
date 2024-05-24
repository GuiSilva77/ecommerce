import vine from '@vinejs/vine'

export const estoqueCriarSaidaValidador = vine.compile(
  vine.object({
    quantidade: vine.number().min(1),
    lote: vine.string(),
    produtoId: vine.number().positive(),
    motivo: vine.string().nullable(),
    vendaId: vine.number().nullable(),
  })
)
