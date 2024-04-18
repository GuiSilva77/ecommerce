import vine from '@vinejs/vine'

export const idValidador = vine.compile(
  vine.object({
    id: vine.number().decimal(0),
  })
)
