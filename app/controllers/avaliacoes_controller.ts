import AvaliacaoService from '#services/avaliacao_service'
import { criarValidador } from '#validators/Avaliacao/criar'
import { encontrarValidador } from '#validators/Avaliacao/encontrar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AvaliacoesController {
  constructor(protected avaliacaoService: AvaliacaoService) {}

  async encontrarAvaliacoesPaginadas({ request, response }: HttpContext) {
    const linhaDeBusca = request.qs()
    const dadosValidados = await encontrarValidador.validate(linhaDeBusca)
    await console.log(dadosValidados)

    const resultado = await this.avaliacaoService.encontrarPorid_comerciante(
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
    const id = await request.param('id')

    const dadosValidados = await request.validateUsing(criarValidador)
    const resultado = await this.avaliacaoService.atualizar(id, dadosValidados)

    return response.ok(resultado)
  }

  async deletarAvaliacao({ request, response }: HttpContext) {
    const id = await request.param('id')

    const resultado = await this.avaliacaoService.deletar(id)

    return response.ok(resultado)
  }
}
