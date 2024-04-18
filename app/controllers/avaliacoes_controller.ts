import AvaliacaoService from '#services/avaliacao_service'
import { criarValidador, encontrarValidador, avaliacaoIdValidador } from '#validators/Avaliacao'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AvaliacoesController {
  constructor(protected avaliacaoService: AvaliacaoService) {}

  async encontrarAvaliacoesPaginadas({ request, response }: HttpContext) {
    const linhaDeBusca = request.qs()

    const dadosValidados = await encontrarValidador.validate(linhaDeBusca)

    const resultado = await this.avaliacaoService.encontrarPorComerciante_Id(
      dadosValidados.comerciante_id,
      dadosValidados.pagina,
      dadosValidados.quantidade
    )

    return response.ok(resultado)
  }

  async criarAvaliacao({ request, response }: HttpContext) {
    const dadosValidados = await request.validateUsing(criarValidador)
    const resultado = await this.avaliacaoService.criarAvaliacao(dadosValidados)

    return response.created(resultado)
  }

  async atualizarAvaliacao({ request, response }: HttpContext) {
    const qs = request.qs()

    const id = await avaliacaoIdValidador.validate(qs)

    const dadosValidados = await request.validateUsing(criarValidador)
    const resultado = await this.avaliacaoService.atualizar(id.id, dadosValidados)

    return response.ok(resultado)
  }

  async deletarAvaliacao({ request, response }: HttpContext) {
    const id = await avaliacaoIdValidador.validate(request.qs())
    const resultado = await this.avaliacaoService.deletar(id.id)

    return response.ok(resultado)
  }
}
