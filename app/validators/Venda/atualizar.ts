import vine from '@vinejs/vine'

export const atualizarVendaValidador = vine.compile(
  vine.object({
    total: vine.number().decimal(2).optional(),
    descontos: vine.number().decimal(2).optional(),
    pedidoId: vine.number().positive().optional(),
    comercianteId: vine.number().positive().optional(),
  })
)
