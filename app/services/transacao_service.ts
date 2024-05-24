import BadRequestException from '#exceptions/bad_request_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Transacao from '#models/transacao'
import Venda from '#models/venda'

type TransacaoPayload = {
  vendaId: number
  valor: number
  tipo: 'CARTÃO' | 'PIX' | 'DINHEIRO'
  status: 'PROCESSANDO' | 'APROVADO' | 'REPROVADO'
}

type TransacaoPutPayload = {
  valor: number | undefined
  tipo: 'CARTÃO' | 'PIX' | 'DINHEIRO' | undefined
  status: 'PROCESSANDO' | 'APROVADO' | 'REPROVADO' | undefined
}

export default class TransacaoSerivce {
  async buscarTransacaoPorId(id: number) {
    const transacao = Transacao.find(id)

    if (!transacao) throw new ResourceNotFoundException('Transação não enocntrada')

    return transacao
  }

  async criarTransacao(payload: TransacaoPayload) {
    const venda = await Venda.find(payload.vendaId)

    if (!venda) throw new BadRequestException('Venda não informada')

    let novaTransacao = new Transacao().merge(payload)
    await novaTransacao.save()

    venda.transacaoId = payload.vendaId
    await venda.save()

    return novaTransacao
  }

  async atualizarTransacao(id: number, payload: TransacaoPutPayload) {
    let transacao = await Transacao.find(id)

    if (!transacao) throw new ResourceNotFoundException('Transação não encontrada')

    transacao.merge(payload)
    await transacao.save()

    return transacao
  }

  async deletarTransacao(id: number) {
    const transacao = await Transacao.find(id)

    if (!transacao) throw new ResourceNotFoundException('Transação não encontrada')

    let venda = await Venda.findOrFail(transacao.vendaId)

    venda.transacaoId = null
    await venda.save()

    await transacao.delete()
  }
}
