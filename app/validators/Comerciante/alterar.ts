import vine from '@vinejs/vine'

export const alteraComercianteValidador = vine.compile(vine.object({
  ativo: vine.boolean().optional(),
  email: vine.string().email().toLowerCase().trim().optional(),
  valor_min_entrega: vine.number().min(0).optional(),
  tipo: vine.enum(['SUPERMERCADO', 'HORTIFRUTI', 'AÇOUGUE', 'PADARIA', 'SORVETERIA']).optional(),
  endereco: vine.object({
    rua: vine.string().maxLength(100),
    numero: vine.string().maxLength(30),
    bairro: vine.string().maxLength(100),
    cidade: vine.string().maxLength(50),
    estado: vine.string().maxLength(25),
    cep: vine.string().maxLength(8),
    tipo: vine.enum(['RESIDENCIAL' , 'COMERCIAL' , 'CASA' , 'TRABALHO']),
   }).optional(),
   telefone: vine.array(vine.object({
     numero: vine.string().mobile((campo) => {return {locale:['pt-BR']}}),
     tipo: vine.enum(['CELULAR' , 'FIXO']),
   })).optional(),

}))
