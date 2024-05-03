import vine from '@vinejs/vine'

export const criarValidador = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(255),
    valor_venda: vine.number().decimal(2).positive(),
    valor_custo: vine.number().decimal(2).positive(),
    descricao: vine.string().trim().minLength(3).maxLength(255),
    img_url: vine.string(),
    // img_url: vine.string().activeUrl(),
    unidade: vine.enum(['UN', 'KG', 'L', 'M', 'CM', 'MM']),
    categorias: vine.array(
      vine.object({
        id_categoria: vine.number().positive().optional(),
        nome: vine.string().trim().minLength(3).maxLength(255),
      })
    ),
  })
)
