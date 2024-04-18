import vine from '@vinejs/vine'

export const encontrarValidador = vine.compile(
  vine.object({
    pagina: vine.number().withoutDecimals().positive(),
    quantidade: vine.number().withoutDecimals().positive(),
  })
)
