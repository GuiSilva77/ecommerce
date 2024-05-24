import vine from '@vinejs/vine'

export const atualizarAvaliacaoValidador = vine.compile(
  vine.object({
    avaliacao: vine.number().decimal(2).optional(),
    conteudo: vine.string().minLength(10).optional(),
    comercianteId: vine.number().positive().optional(),
  })
)
