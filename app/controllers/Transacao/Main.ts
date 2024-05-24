import TransacaoSerivce from '#services/transacao_service'
import { atualizarTransacaoValidador } from '#validators/Transacao/atualizar'
import { criarTransacaoValidador } from '#validators/Transacao/criar'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TransacaoController {
  constructor(protected transacaoService: TransacaoSerivce) {}

  async buscarTransacaoPorId({ request, response }: HttpContext) {
    const id = request.param('id')

    const transacao = await this.transacaoService.buscarTransacaoPorId(id)

    return response.ok(transacao)
  }

  async criarTransacao({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarTransacaoValidador)

    const transacao = await this.transacaoService.criarTransacao(payload)

    return response.created(transacao)
  }

  async atualizarTransacao({ request, response }: HttpContext) {
    const id = request.param('id')
    const payload = await request.validateUsing(atualizarTransacaoValidador)

    const transacao = await this.transacaoService.atualizarTransacao(id, payload)

    return response.ok(transacao)
  }

  async deletarTransacao({ request, response }: HttpContext) {
    const id = request.param('id')

    await this.transacaoService.deletarTransacao(id)

    return response.ok({
      codigo: 200,
      mensagem: 'Transação deletada com sucesso',
    })
  }
}
