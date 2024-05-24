import AvaliacaoService from '#services/avaliacao_service'
import { atualizarAvaliacaoValidador } from '#validators/Avaliacao/atualizar'
import { criarAvaliacaoValidador } from '#validators/Avaliacao/criar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AvaliacoesController {
  constructor(protected avaliacaoService: AvaliacaoService) {}

  async buscarAvaliacoesPorComerciante({ request, response }: HttpContext) {
    const id_comerciante = request.param('id')
    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const avaliacoes = await this.avaliacaoService.buscarAvaliacoesPorComercianteId(
      id_comerciante,
      pagina,
      quantidade
    )

    return response.ok(avaliacoes)
  }

  async buscarAvaliacoesPorUsuario({ request, response }: HttpContext) {
    const id_usuario = request.param('id')
    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const avaliacoes = this.avaliacaoService.buscarAvaliacoesPorUsuarioId(
      id_usuario,
      pagina,
      quantidade
    )

    return response.ok(avaliacoes)
  }

  async criarAvaliacao({ request, response, auth }: HttpContext) {
    const id_usuario = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const payload = await request.validateUsing(criarAvaliacaoValidador)

    const resultado = await this.avaliacaoService.criarAvaliacao(id_usuario, payload)

    return response.created(resultado)
  }

  async atualizarAvaliacao({ request, response, auth }: HttpContext) {
    const id_usuario = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const id_comerciante = request.param('id')
    const payload = await request.validateUsing(atualizarAvaliacaoValidador)

    const resultado = await this.avaliacaoService.atualizarAvaliacao(
      id_usuario,
      id_comerciante,
      payload
    )

    return response.ok(resultado)
  }

  async deletarAvaliacao({ request, response, auth }: HttpContext) {
    const id_usuario = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const id_avaliacao = request.param('id')

    await this.avaliacaoService.deletarAvaliacao(id_avaliacao, id_usuario)

    return response.ok({
      codigo: 200,
      mensagem: 'Venda deletada com sucesso',
    })
  }
}
