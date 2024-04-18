import vine from '@vinejs/vine'

export const criarValidador = vine.compile(
  vine.object({
    avaliacao: vine.number().decimal(2),
    conteudo: vine.string().minLength(10),
    id_comerciante: vine.number().decimal(0),
  })
)
