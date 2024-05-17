import vine from '@vinejs/vine'

export const estoqueCriarEntradaValidador = vine.compile(
  vine.object({
    quantidade: vine.number().min(1),
    produtoId: vine.number().positive(),
    validade: vine.date().after('today'),
    lote: vine.string(),
  })
)
