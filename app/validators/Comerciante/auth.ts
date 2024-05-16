import vine from '@vinejs/vine'

export const AuthComercianteValidador = vine.compile(
  vine.object({
    senha: vine
      .string()
      .minLength(8),
    cnpj: vine.string().minLength(14),
  })
)