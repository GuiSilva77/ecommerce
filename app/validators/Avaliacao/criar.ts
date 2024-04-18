import vine from '@vinejs/vine'

<<<<<<< HEAD:app/validators/avaliacao.ts
export const encontrarValidador = vine.compile(
  vine.object({
    id_comerciante: vine.number().decimal(0),
    pagina: vine.number().decimal(0),
    quantidade: vine.number().decimal(0),
  })
)

=======
>>>>>>> 45d6466048402602114d02aa4abe4f133666350b:app/validators/Avaliacao/criar.ts
export const criarValidador = vine.compile(
  vine.object({
    avaliacao: vine.number().decimal(2),
    conteudo: vine.string().minLength(10),
    id_comerciante: vine.number().decimal(0),
  })
)
