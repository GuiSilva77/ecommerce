import vine from '@vinejs/vine'

export const criarAvaliacaoValidador = vine.compile(
  vine.object({
    avaliacao: vine.number().decimal(2),
    conteudo: vine.string().minLength(10),
    comercianteId: vine.number().positive(),
  })
)
