import VendaService from '#services/Estoque/venda'
import { atualizarVendaValidador } from '#validators/Venda/atualizar'
import { criarVendaValidador } from '#validators/Venda/criar'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VendaController {
  constructor(protected vendaService: VendaService) {}

  async buscarVendas({ request, response, auth }: HttpContext) {
    const comerciante_id = auth.getUserOrFail().currentAccessToken.tokenableId as number

    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const vendas = await this.vendaService.buscarVendas(comerciante_id, pagina, quantidade)

    return response.ok(vendas)
  }

  async buscarVenda({ request, response }: HttpContext) {
    const id = request.param('id')

    const venda = await this.vendaService.buscarVenda(id)

    return response.ok(venda)
  }

  async criarVenda({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(criarVendaValidador)

    const venda = await this.vendaService.criarVenda(payload)

    return response.created(venda)
  }

  async atualizarVenda({ request, response, auth }: HttpContext) {
    const id = request.param('id')

    const payload = await request.validateUsing(atualizarVendaValidador)

    const venda = await this.vendaService.atualizarVenda(id, payload)

    return response.ok(venda)
  }

  async deletarVenda({ request, response, auth }: HttpContext) {
    const id = request.param('id')

    await this.vendaService.deletarVenda(id)

    return response.ok({
      codigo: 200,
      mensagem: 'Venda deletada com sucesso',
    })
  }
}
