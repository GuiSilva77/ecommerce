import vine from '@vinejs/vine'

export const atualizarTransacaoValidador = vine.compile(
  vine.object({
    vendaId: vine.number().positive().optional(),
    valor: vine.number().decimal(2).positive().optional(),
    tipo: vine.enum(['CARTÃO', 'PIX', 'DINHEIRO']).optional(),
    status: vine.enum(['PROCESSANDO', 'APROVADO', 'REPROVADO']).optional(),
  })
)
