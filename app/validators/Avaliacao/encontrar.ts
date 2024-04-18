import vine from '@vinejs/vine'

export const encontrarValidador = vine.compile(
  vine.object({
    comerciante_id: vine.number().decimal(0),
    pagina: vine.number().decimal(0),
    quantidade: vine.number().decimal(0),
  })
)
