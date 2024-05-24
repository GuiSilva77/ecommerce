import vine from '@vinejs/vine'

export const criarTransacaoValidador = vine.compile(
  vine.object({
    vendaId: vine.number().positive(),
    valor: vine.number().decimal(2).positive(),
    tipo: vine.enum(['CARTÃO', 'PIX', 'DINHEIRO']),
    status: vine.enum(['PROCESSANDO', 'APROVADO', 'REPROVADO']),
  })
)
