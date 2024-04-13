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
    img_url: vine.string().activeUrl(),
    cpf: vine.string().minLength(11).maxLength(11),
    ativo: vine.boolean(),
    validado: vine.boolean(),
  })
)

export const atualizarValidator = vine.compile(
  vine.object({
    nome: vine.string().nullable(),
    email: vine.string().email().nullable(),
    senha: vine.string().minLength(8).nullable(),
    img_url: vine.string().activeUrl().nullable(),
    cpf: vine.string().minLength(11).maxLength(11),
    data_mod: vine.date(),
    ativo: vine.boolean(),
    validado: vine.boolean(),
    enderecos: vine.array(vine.string()),
    telefones: vine.array(vine.string().minLength(14).maxLength(14)),
  })
)
