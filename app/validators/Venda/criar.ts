import vine from '@vinejs/vine'

export const criarVendaValidador = vine.compile(
  vine.object({
    total: vine.number().decimal(2),
    descontos: vine.number(),
    pedidoId: vine.number().positive(),
    comercianteId: vine.number().positive(),
  })
)
