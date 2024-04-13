import vine from '@vinejs/vine'

export const encontrarValidador = vine.compile(
  vine.object({
    comerciante_id: vine.number().decimal(0),
    pagina: vine.number().decimal(0),
    quantidade: vine.number().decimal(0),
  })
)

export const criarValidador = vine.compile(
  vine.object({
    avaliacao: vine.number().decimal(2),
    conteudo: vine.string().minLength(10),
    comerciante_id: vine.number().decimal(0),
  })
)
