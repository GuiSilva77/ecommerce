import AvaliacaoService from '#services/avaliacao_service'
import { criarValidador, encontrarValidador } from '#validators/avaliacao'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AvaliacoesController {
  constructor(protected avaliacaoService: AvaliacaoService) {}

  async encontrarAvaliacoesPaginadas({ request }: HttpContext) {
    const linhaDeBusca = request.qs()

    const dadosValidados = await encontrarValidador.validate(linhaDeBusca)

    return await this.avaliacaoService.encontrarPorid_comerciante(
      dadosValidados.id_comerciante,
      dadosValidados.pagina,
      dadosValidados.quantidade
    )
  }

  async criarAvaliacao({ request }: HttpContext) {
    const dadosValidados = await request.validateUsing(criarValidador)

    return await this.avaliacaoService.criarAvaliacao(dadosValidados)
  }

  async atualizarAvaliacao({ request }: HttpContext) {
    const dadosValidados = await request.validateUsing(criarValidador)

    return await this.avaliacaoService.atualizar(dadosValidados)
  }
}
