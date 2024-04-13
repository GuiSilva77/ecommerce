import vine from '@vinejs/vine'

export const encontrarValidator = vine.compile(
  vine.object({
    cpf: vine.string().trim().minLength(11).maxLength(11),
  })
)

export const criarValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    email: vine.string().email(),
    senha: vine.string().minLength(8),
    cpf: vine.string().minLength(11).maxLength(11),
    telefones: vine.object({
      numero: vine.string().mobile((campo) => {
        return { locale: ['pt-BR'] }
      }),
      tipo: vine.enum(['CELULAR', 'FIXO']),
    }),
  })
)

export const atualizarValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    email: vine.string().email().optional(),
    senha: vine.string().minLength(8).optional(),
    cpf: vine.string().minLength(11).maxLength(11).optional(),
    enderecos: vine.array(vine.string()),
    telefones: vine
      .array(
        vine.object({
          numero: vine.string().mobile((campo) => {
            return { locale: ['pt-BR'] }
          }),
          tipo: vine.enum(['CELULAR', 'FIXO']),
        })
      )
      .optional(),
  })
)
